import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { AppModule } from "./app.module"

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder().setTitle("NestBlog").setVersion("1.0").build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/docs", app, document)

  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}
bootstrap()
