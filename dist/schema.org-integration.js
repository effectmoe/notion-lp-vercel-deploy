// Integration file for Schema.org structured data
// This file loads the Schema.org data and renders it into JSON-LD script tags

// Import the schema data
const schemaData = {
  product: productSchema,
  faq: faqSchema,
  review: reviewSchema,
  organization: organizationSchema,
  website: websiteSchema,
  service: serviceSchema
};

// Function to render Schema.org data as JSON-LD script tags
function renderSchemaOrgData() {
  // Create script elements for each schema type
  Object.keys(schemaData).forEach(schemaType => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData[schemaType], null, 2);
    document.head.appendChild(script);
  });

  console.log('Schema.org structured data has been added to the page.');
}

// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderSchemaOrgData);