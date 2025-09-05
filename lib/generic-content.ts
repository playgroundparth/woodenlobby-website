import { GenericContent } from "./catalog"

let cachedGenericContent: GenericContent | null = null

// Proper CSV parser that handles quoted content with commas AND newlines
function parseCSVContent(csvText: string): string[][] {
  const result: string[][] = []
  const rows: string[] = []
  let current = ''
  let inQuotes = false
  let i = 0
  
  // First, split into proper CSV rows (respecting quotes)
  while (i < csvText.length) {
    const char = csvText[i]
    
    if (char === '"') {
      if (inQuotes && csvText[i + 1] === '"') {
        // Handle escaped quotes ("")
        current += '"'
        i += 2
        continue
      }
      inQuotes = !inQuotes
      current += char
    } else if (char === '\n' && !inQuotes) {
      // End of row only when not inside quotes
      rows.push(current.trim())
      current = ''
    } else {
      current += char
    }
    i++
  }
  
  // Add the last row
  if (current.trim()) {
    rows.push(current.trim())
  }
  
  // Now parse each row into fields
  for (const row of rows) {
    const fields: string[] = []
    let field = ''
    let inQuotes = false
    let j = 0
    
    while (j < row.length) {
      const char = row[j]
      
      if (char === '"') {
        if (inQuotes && row[j + 1] === '"') {
          // Handle escaped quotes ("")
          field += '"'
          j += 2
          continue
        }
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        fields.push(field.trim())
        field = ''
      } else {
        field += char
      }
      j++
    }
    
    // Add the last field
    fields.push(field.trim())
    result.push(fields)
  }
  
  return result
}

export async function getGenericContent(): Promise<GenericContent> {
  // Return cached content if available
  if (cachedGenericContent) {
    return cachedGenericContent
  }

  try {
    // Check if we have a generic content sheet URL
    const genericContentUrl = process.env.NEXT_PUBLIC_GENERIC_CONTENT_CSV_URL
    let csvText = ""
    let usingFallback = false
    
    if (!genericContentUrl) {
      console.log("❌ No generic content URL configured in NEXT_PUBLIC_GENERIC_CONTENT_CSV_URL")
      usingFallback = true
    } else {
      console.log("🔄 Fetching generic content from:", genericContentUrl)

      try {
        const response = await fetch(genericContentUrl, {
          next: { revalidate: 3600 } // Cache for 1 hour
        })

        if (!response.ok) {
          console.error(`❌ Failed to fetch generic content: ${response.status} ${response.statusText}`)
          throw new Error(`Failed to fetch generic content: ${response.status}`)
        }

        csvText = await response.text()
        
        // Check if we got HTML instead of CSV (common with Google Sheets access issues)
        if (csvText.toLowerCase().includes('<html>') || csvText.toLowerCase().includes('<!doctype')) {
          console.error("❌ Google Sheets returned HTML instead of CSV. Check if the sheet is published correctly with proper sharing permissions.")
          console.log("💡 Sheet should be published as: File > Publish to web > CSV format")
          throw new Error("Google Sheets access issue")
        }

        console.log("📄 CSV Response preview:", csvText.substring(0, 200) + "...")
      } catch (googleSheetsError) {
        console.log("⚠️ Google Sheets failed, trying local fallback file...")
        usingFallback = true
      }
    }

    // Try local fallback if Google Sheets failed
    if (usingFallback) {
      console.log("🔄 Using local generic content fallback file...")
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      
      const fallbackResponse = await fetch(`${baseUrl}/data/generic-content.csv`, {
        next: { revalidate: 3600 }
      })
      
      if (fallbackResponse.ok) {
        csvText = await fallbackResponse.text()
        console.log("✅ Successfully loaded local fallback generic content")
      } else {
        console.error("❌ Failed to load local fallback file as well")
        return {}
      }
    }
    
    // Parse the entire CSV content properly (handles multi-line quoted fields)
    const csvRows = parseCSVContent(csvText.trim())
    
    if (csvRows.length < 2) {
      console.log("❌ Generic content CSV is empty or invalid - only", csvRows.length, "rows found")
      return {}
    }

    const headers = csvRows[0]
    const dataRow = csvRows[1]
    
    console.log("📊 Parsed headers:", headers)
    console.log("📊 Parsed data row length:", dataRow.length)
    console.log("📊 First few characters of each field:")
    dataRow.forEach((field, index) => {
      console.log(`  [${index}] ${headers[index]}: ${field.substring(0, 50)}${field.length > 50 ? '...' : ''}`)
    })

    // Create generic content object
    const genericContent: GenericContent = {}
    
    headers.forEach((header, index) => {
      const value = dataRow[index]
      const cleanHeader = header.toLowerCase().trim()
      const cleanValue = value ? value.trim() : ''
      
      console.log(`🔍 Processing field [${index}]: "${cleanHeader}" = ${cleanValue.length} characters`)
      
      if (cleanValue && cleanValue !== '') {
        // Clean up markdown content for proper rendering
        const processedValue = cleanValue
          .replace(/\\n/g, '\n')  // Convert \n to actual newlines
          .replace(/\\"/g, '"')   // Convert \" to actual quotes
          .replace(/\\r/g, '')    // Remove \r characters
          .replace(/^"|"$/g, '')  // Remove surrounding quotes if any
          .trim()
        
        console.log(`🔧 Processed ${cleanHeader}: ${processedValue.substring(0, 100)}...`)
        
        switch (cleanHeader) {
          case 'merchant_details':
            genericContent.merchant_details = processedValue
            console.log("✅ Set merchant_details")
            break
          case 'care_instructions':
            genericContent.care_instructions = processedValue
            console.log("✅ Set care_instructions")
            break
          case 'delivery_installation':
            genericContent.delivery_installation = processedValue
            console.log("✅ Set delivery_installation")
            break
          case 'warranty_info':
            genericContent.warranty_info = processedValue
            console.log("✅ Set warranty_info")
            break
          case 'terms_conditions':
            genericContent.terms_conditions = processedValue
            console.log("✅ Set terms_conditions")
            break
          case 'faqs':
            genericContent.faqs = processedValue
            console.log("✅ Set faqs")
            break
          case 'disclaimer':
            genericContent.disclaimer = processedValue
            console.log("✅ Set disclaimer")
            break
          default:
            console.log(`⚠️ Unknown header: "${cleanHeader}"`)
        }
      } else {
        console.log(`⚠️ Empty value for "${cleanHeader}"`)
      }
    })

    // Cache the result
    cachedGenericContent = genericContent
    const source = usingFallback ? "local fallback file" : "Google Sheets"
    console.log(`✅ Successfully loaded generic content from ${source} with keys:`, Object.keys(genericContent))
    return genericContent

  } catch (error) {
    console.error("❌ Error fetching generic content:", error)
    console.log("💡 Using fallback generic content instead")
    return {}
  }
}

// Function to clear cache (useful for development)
export function clearGenericContentCache() {
  cachedGenericContent = null
}

// Clear cache immediately for this session to test new processing
clearGenericContentCache()
