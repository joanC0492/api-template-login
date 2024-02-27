import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { config } from "./config";
import { dbConnection } from "./database";
import { routerApi } from "./routes";

export class Server {
  private app: Application;
  private readonly PORT = config.port;

  constructor() {
    // express
    this.app = express();
    // database
    this.getConnectionDB();
    // middleware
    this.middlewares();
    // routes
    this.routes();
  }

  private async getConnectionDB(): Promise<void> {
    const res = await dbConnection();
    console.log(res);
  }

  private middlewares(): void {
    // Da información detallada sobre cada solicitud http
    this.app.use(morgan("dev"));
    // whitelist permite que tu server responda a solicitudes solo desde orígenes específicos que has autorizado
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());
    // Ahora podemos acceder a la carpeta "public"
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  private routes(): void {
    routerApi(this.app);
  }

  public listen(): void {
    this.app.listen(this.PORT, () =>
      console.log(`Escuchando el puerto: ${this.PORT}`)
    );
  }
}
