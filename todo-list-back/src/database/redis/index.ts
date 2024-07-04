import Redis from "ioredis";

let redisClient: Redis
const PORT = 6379


/**
 * lance la connexion du client redis
 */
export const connectClient = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        redisClient = new Redis({
          host: "127.0.0.1",
          port: PORT, //, 6379
          // username: USR, //
        //   password: PWD
        });
        redisClient.on("error", function (err) {
          console.error(`redis client connection failed: ${err}`)
          // reject(err)
        });
        redisClient.on("connect", function (err) {
          console.info(`redis client successfully Connected`)
          // resolve(true)
        });
         resolve(true)
      } catch (error) {
        console.log("🚀 ~ file: index.ts:29 ~ connectClient ~ error:", error)
        reject(error)
      }
    })
  }

  export { redisClient };
