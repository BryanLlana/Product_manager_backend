import swaggerJSDoc from "swagger-jsdoc"

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Products',
        description: 'API operations related to products'
      }
    ],
    info: {
      title: 'REST API Node.js / Express / TypeScript',
      version: '1.0.0',
      description: 'API Docs for products'
    }
  },
  apis: ['./src/presentation/products/routes.ts']
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec