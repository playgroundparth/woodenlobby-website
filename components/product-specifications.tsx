"use client"

import { Product, GenericContent } from "@/lib/catalog"
import { getGenericContent } from "@/lib/generic-content"
import { ChevronRight, Truck, Shield, Lock } from "lucide-react"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface ProductSpecificationsProps {
  product: Product
}


interface ExpandableSectionProps {
  title: string
  content?: string
  defaultExpanded?: boolean
}

const ExpandableSection = ({ title, content, defaultExpanded = false }: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  
  if (!content) return null

  // Process content for better markdown rendering
  const processedContent = content
    .replace(/\\n/g, '\n')  // Convert escaped newlines
    .replace(/\\"/g, '"')   // Convert escaped quotes
    .replace(/\\r/g, '')    // Remove carriage returns
    .trim()

  console.log(`📄 Rendering ${title} content:`, processedContent.substring(0, 200) + '...')

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 px-4 -mx-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <ChevronRight className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </button>
      {isExpanded && (
        <div className="pb-4 text-sm text-gray-700">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom table components with mobile-responsive styling
              table: ({ children }) => (
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full min-w-0 border-collapse border border-gray-200 rounded-lg overflow-hidden bg-white">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-50">
                  {children}
                </thead>
              ),
              tbody: ({ children }) => (
                <tbody className="divide-y divide-gray-200 bg-white">
                  {children}
                </tbody>
              ),
              tr: ({ children }) => (
                <tr className="hover:bg-gray-50">
                  {children}
                </tr>
              ),
              th: ({ children }) => (
                <th className="border-r border-gray-200 last:border-r-0 px-3 md:px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider bg-gray-50">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-r border-gray-200 last:border-r-0 px-3 md:px-6 py-4 text-sm text-gray-700 break-words max-w-0">
                  {children}
                </td>
              ),
              // Other components
              p: ({ children }) => <p className="mb-3 text-sm text-gray-700 leading-relaxed">{children}</p>,
              h1: ({ children }) => <h1 className="text-lg font-bold text-gray-900 mb-3">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-bold text-gray-900 mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-base font-semibold text-gray-900 mb-2">{children}</h3>,
              strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
              li: ({ children }) => <li className="text-sm text-gray-700">{children}</li>,
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const [genericContent, setGenericContent] = useState<GenericContent>({
    merchant_details: `**About Woodenlobby**\n\nWoodenlobby has been crafting premium solid wood furniture for over **15 years**. Located in Hansi, Haryana, our skilled artisans combine traditional craftsmanship with modern design sensibilities.\n\n**Contact Information:**\n- **Address:** Kali Devi Rd, Mochi Mohalla, Hansi, Haryana 125033\n- **Phone/WhatsApp:** +91-999-222-1888\n- **Email:** info@woodenlobby.com`,
    care_instructions: `**Daily Care:**\n- Clean with a dry, soft cloth\n- Use microfiber cloth for best results\n- Wipe spills immediately\n\n**Weekly Maintenance:**\n- Dust thoroughly with furniture polish\n- Use wood-specific cleaners only`,
    delivery_installation: `**Delivery Information:**\n- Free delivery within city limits\n- Standard delivery: 2-4 weeks\n- Express delivery available (additional charges apply)\n\n**Installation:**\n- Basic assembly included\n- Professional installation available`,
    warranty_info: `**Manufacturing Warranty: 36 Months**\n- Covers all structural defects\n- Wood joinery and construction issues\n- Hardware and mechanism failures`,
    terms_conditions: `**Terms & Conditions:**\n\n1. **Payment:** 50% advance, balance on delivery\n2. **Customization:** Available with additional cost and time\n3. **Return Policy:** 7 days from delivery (conditions apply)`,
    faqs: `**Frequently Asked Questions:**\n\n**Q: How long does manufacturing take?**\nA: Standard items: 2-4 weeks. Custom pieces: 4-8 weeks.\n\n**Q: Can I customize the design?**\nA: Yes! We offer customization options with additional cost.`,
    disclaimer: `**Important Disclaimers:**\n\n- Natural wood variations in color and grain are normal\n- Actual product may vary slightly from images\n- Delivery times are estimates and may vary`
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchGenericContent() {
      setIsLoading(true)
      try {
        const content = await getGenericContent()
        if (Object.keys(content).length > 0) {
          setGenericContent(content)
        }
      } catch (error) {
        console.error('Failed to fetch generic content:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchGenericContent()
  }, [])

  // Check if product has any specification data
  const hasSpecifications = Boolean(product.specifications_content)

  // Check if we have actual Google Sheets data vs fallback content
  const isDemoProduct = isLoading || Object.keys(genericContent).every(key => 
    genericContent[key as keyof GenericContent]?.includes('**About Woodenlobby**') || 
    genericContent[key as keyof GenericContent]?.includes('**Daily Care:**') ||
    !genericContent[key as keyof GenericContent]
  )
  const demoSpecsContent = `## Specifications

| **Material** | Solid Sheesham Wood |
|--------------|---------------------|
| **Finish** | Rich Walnut Matte Finish |
| **Dimensions** | 78" L × 72" W × 16" H |
| **Dimensions (Metric)** | 198.1 L × 182.9 W × 40.6 H cm |
| **Pack Content** | 1 King Size Platform Bed |
| **Weight** | 45 Kg |
| **Brand** | Woodenlobby |
| **SKU** | WL-AUPB-K-001 |

### Features
- **Platform Design**: No box spring required
- **Solid Construction**: Traditional mortise and tenon joinery
- **Premium Finish**: Hand-applied walnut stain with protective coating
- **Assembly**: Basic DIY assembly with provided tools and hardware`

  const demoOverviewContent = `The Aurora Platform Bed combines **modern minimalism** with traditional craftsmanship. Made from premium sheesham wood with a rich walnut finish, this king-size bed is designed to be the centerpiece of your bedroom.

**Key Features:**
- Solid sheesham wood construction
- Rich walnut finish
- Platform design eliminates need for box spring  
- Low profile modern aesthetic
- Handcrafted with traditional joinery`

  const hasExpandableContent = [
    product.overview_content,
    genericContent.merchant_details,
    genericContent.care_instructions,
    genericContent.delivery_installation,
    genericContent.warranty_info,
    genericContent.terms_conditions,
    genericContent.faqs,
    genericContent.disclaimer
  ].some(Boolean) || Object.keys(genericContent).length > 0 // Show if we have any content

  if (!hasSpecifications && !hasExpandableContent) {
    return null
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Benefits Badges */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 bg-orange-50 border border-orange-200 rounded-lg text-center min-w-0">
          <Truck className="h-4 w-4 text-orange-600 flex-shrink-0" />
          <p className="text-xs font-semibold text-gray-900 leading-tight">Free Delivery*</p>
        </div>
        <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 bg-green-50 border border-green-200 rounded-lg text-center min-w-0">
          <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
          <p className="text-xs font-semibold text-gray-900 leading-tight">36 Month Warranty*</p>
        </div>
        <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg text-center min-w-0">
          <Lock className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <p className="text-xs font-semibold text-gray-900 leading-tight">Safe & Secure</p>
        </div>
      </div>

      {/* Product Overview Section */}
      {hasSpecifications && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Product Overview</h3>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Custom table components with mobile-responsive styling (same as expandable sections)
                  table: ({ children }) => (
                    <div className="mb-4 overflow-x-auto">
                      <table className="w-full min-w-0 border-collapse border border-gray-200 rounded-lg overflow-hidden bg-white">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-gray-50">
                      {children}
                    </thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {children}
                    </tbody>
                  ),
                  tr: ({ children }) => (
                    <tr className="hover:bg-gray-50">
                      {children}
                    </tr>
                  ),
                  th: ({ children }) => (
                    <th className="border-r border-gray-200 last:border-r-0 px-3 md:px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider bg-gray-50">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border-r border-gray-200 last:border-r-0 px-3 md:px-6 py-4 text-sm text-gray-700 break-words max-w-0">
                      {children}
                    </td>
                  ),
                  // Other components
                  p: ({ children }) => <p className="mb-3 text-sm text-gray-700 leading-relaxed">{children}</p>,
                  h1: ({ children }) => <h1 className="text-lg font-bold text-gray-900 mb-3">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-bold text-gray-900 mb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-semibold text-gray-900 mb-2">{children}</h3>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
                  li: ({ children }) => <li className="text-sm text-gray-700">{children}</li>,
                }}
              >
                {product.specifications_content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {/* Expandable Sections */}
      {hasExpandableContent && (
        <div className="space-y-0">
          <ExpandableSection 
            title="Overview" 
            content={product.overview_content}
            defaultExpanded={true}
          />
          <ExpandableSection 
            title="Merchant Details" 
            content={genericContent.merchant_details} 
          />
          <ExpandableSection 
            title="Care & Instructions" 
            content={genericContent.care_instructions} 
          />
          <ExpandableSection 
            title="Delivery & Installation" 
            content={genericContent.delivery_installation || "**Delivery Information:**\n- Free delivery within city limits*\n- Assembly service available at extra cost\n- Estimated delivery: 15-20 business days\n- Professional installation available"} 
          />
          <ExpandableSection 
            title="Warranty" 
            content={genericContent.warranty_info} 
          />
          <ExpandableSection 
            title="Terms And Conditions" 
            content={genericContent.terms_conditions || "**Terms:**\n- Made to order items cannot be returned\n- Advance payment required for custom orders\n- Prices subject to change without notice\n- Custom sizes available on request"} 
          />
          <ExpandableSection 
            title="FAQ's" 
            content={genericContent.faqs || "**Frequently Asked Questions:**\n\n**Q: How long does delivery take?**\nA: 15-20 business days for standard items\n\n**Q: Do you provide assembly?**\nA: Yes, assembly service available at additional cost\n\n**Q: Can I customize dimensions?**\nA: Yes, custom sizes available. Contact us for pricing."} 
          />
          <ExpandableSection 
            title="Disclaimer" 
            content={genericContent.disclaimer || "**Important Notice:**\n- Slight variations in wood grain and color are natural\n- Images are for representation only\n- Actual product may vary slightly from images\n- Wood is a natural material and will have unique characteristics"} 
          />
        </div>
      )}
    </div>
  )
}
