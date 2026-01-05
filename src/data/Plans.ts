interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular: boolean;
  slug: string;
}

interface CustomPackage {
  service: string;
  price: string;
}

interface ProductionService {
  title: string;
  price: string;
  isPopular?: boolean;
  slug: string;
}

interface PricingCategory {
  title: string;
  slug: string;
  description: string;
  plans: Plan[];
  customPackages?: CustomPackage[];
  productionServices?: ProductionService[];
}

export function getPricingData(): PricingCategory[] {
  const customPackages: CustomPackage[] = [
    { service: "Social Media management", price: "Rs 500 per platform/month" },
    { service: "Brand Video", price: "Rs 3000" },
    { service: "Digital Gateway Board", price: "Rs " },
    { service: "Social Media Boosting", price: "Rs" },
    { service: "Product Video", price: "Rs 50 per product" },
    { service: "Product Photoshoot", price: "Rs 20 per product" },
    { service: "Online Store", price: "Free Registration" },
    { service: "Content Design", price: "Rs 500 per Content" },
    { service: "Portfolio Website", price: "Rs 10000" }
  ];

  return [
    {
      title: "Manufacturer Premium Plans",
      slug: "manufacturer",
      description: "Tailored pricing options for manufacturing businesses",
      plans: [
        {
          name: "Plan A",
          price: "Rs 3,500",
          period: "/Month",
          features: [
            "FB/Insta Boost- 5$",
            "Social Media Management",
            "Social Media Contents-12 post",
            "All Festival Contents"
          ],
          isPopular: false,
          slug: "plan-a"
        },
        {
          name: "Plan B",
          price: "Rs 6,060",
          period: "/Month",
          features: [
            "Fb/Insta boost-15$",
            "Social Media Contents-16 posts",
            "All festival contents",
            "Social media handling"
          ],
          isPopular: true,
          slug: "plan-b"
        },
        {
          name: "Plan C",
          price: "Rs 13,460",
          period: "/Month",
          features: [
            "16 custom social media posts",
            "All Festival Contents",
            "Social media handling",
            "Social media boost- 26$",
            "Brand video content-1"
          ],
          isPopular: false,
          slug: "plan-c"
        }
      ],
      customPackages: customPackages
    },
    {
      title: "Distributor Premium Plans",
      slug: "distributor",
      description: "Digital marketing solutions for distributors and retailers",
      plans: [
        {
          name: "Plan A",
          price: "Rs 3,500",
          period: "/Month",
          features: [
            "FB/Insta Boost- 5$",
            "Social Media Management",
            "Social Media Contents-12 post",
            "All Festival Contents"
          ],
          isPopular: false,
          slug: "plan-a"
        },
        {
          name: "Plan B",
          price: "Rs 6,060",
          period: "/Month",
          features: [
            "Fb/Insta boost-15$",
            "Social Media Contents-16 posts",
            "All festival contents",
            "Social media handling",
            "Online Store - 3 Month Free trial"
          ],
          isPopular: true,
          slug: "plan-b"
        },
        {
          name: "Plan C",
          price: "Rs 13,460",
          period: "/Month",
          features: [
            "16 custom social media posts",
            "All Festival Contents",
            "Social media handling",
            "Social media boost- 26$",
            "Brand video content-1",
            "Online Store - Free Registration"
          ],
          isPopular: false,
          slug: "plan-c"
        }
      ],
      customPackages: customPackages
    },
    {
      title: "Organization Premium Plans",
      slug: "organization",
      description: "Complete digital marketing solutions for organizations",
      plans: [
        {
          name: "Plan A",
          price: "Rs 3,500",
          period: "/Month",
          features: [
            "FB/Insta Boost- 5$",
            "Social Media Management",
            "Social Media Contents-12 post",
            "All Festival Contents"
          ],
          isPopular: false,
          slug: "plan-a"
        },
        {
          name: "Plan B",
          price: "Rs 6,060",
          period: "/Month",
          features: [
            "Fb/Insta boost-15$",
            "Social Media Contents-16 posts",
            "All festival contents",
            "Social media handling"
          ],
          isPopular: true,
          slug: "plan-b"
        },
        {
          name: "Plan C",
          price: "Rs 13,460",
          period: "/Month",
          features: [
            "16 custom social media posts",
            "All Festival Contents",
            "Social media Management",
            "Social media boost- 26$",
            "Brand video content-1"
          ],
          isPopular: false,
          slug: "plan-c"
        }
      ],
      customPackages: customPackages
    },
    {
      title: "Production Premium Plans",
      slug: "production",
      description: "Video and content production solutions for your business",
      productionServices: [
        {
          title: "Brand Video with Content Creator",
          price: "NRS 6000 (INDOOR)\nNRS 7000 (OUTDOOR)",
          slug: "brand-video-creator"
        },
        {
          title: "Brand Video without Content Creator only audio",
          price: "NRS 3000",
          slug: "brand-video-audio"
        },
        {
          title: "Product Description with Content Creator (Inhouse)",
          price: "NRS 1250",
          slug: "product-description-creator"
        },
        {
          title: "Product Description without Content Creator (Audio) (studio inhouse)",
          price: "NRS 750",
          slug: "product-description-audio"
        },
        {
          title: "Product Video (studio inhouse)",
          price: "NRS 50 (Inhouse)",
          slug: "product-video"
        },
        {
          title: "Product Photo (studio inhouse)",
          price: "NRS 20",
          slug: "product-photo"
        },
        {
          title: "Conceptual Advertisement Video",
          price: "NRS 15000",
          slug: "conceptual-ad"
        },
        {
          title: "Event Photo/Video",
          price: "NRS 3000",
          slug: "event-media"
        },
        {
          title: "Reels/Tiktok videos",
          price: "NRS 90 per video",
          slug: "social-video"
        },
        {
          title: "Product photo (model)",
          price: "NRS 70 per photo",
          slug: "model-photo"
        },
        {
          title: "Wedding/Ceremonial",
          price: "NRS 35000",
          slug: "wedding"
        }
      ],
      plans: []
    }
  ];
}

export function getPlanDetails(category: string, planSlug: string): Plan | undefined {
  const categoryData = getPricingData().find(cat => cat.slug === category);
  if (!categoryData) return undefined;
  
  return categoryData.plans.find(plan => plan.slug === planSlug);
}

export function getCustomPackages(): CustomPackage[] {
  return getPricingData()[0].customPackages || [];
}