import { redisClient } from ".";

export const hSetJsonData = (key: string, field: string, value: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const stringifyData = JSON.stringify(value);
            await redisClient.hset(key, field, stringifyData);
            resolve(true)
        } catch (error) {
            console.log("🚀 ~ file: functions.ts:163 ~ returnnewPromise ~ error", error)
            reject(error);
        }
    });
};

export const hGetJsonData = (key: string, field:string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await redisClient.hget(key,field);
            const parsedData = JSON.parse(data)
            resolve(parsedData);
        } catch (error) {
            console.log("🚀 ~ file: functions.ts:163 ~ returnnewPromise ~ error", error)
            reject(error);
        }
    });
};

export const hDelJsonData = (key: string, field: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            await redisClient.hdel(key, field);
            resolve(true);
        } catch (error) {
            console.log("🚀 ~ file: functions.ts:163 ~ returnnewPromise ~ error", error);
            reject(error);
        }
    });
};

export const hGetAllFields = (key: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fields = await redisClient.hgetall(key);
            console.log("🚀 ~ file: functions.ts:45 ~ returnnewPromise ~ fields:", fields)

            resolve(fields);
        } catch (error) {
            console.error("Erreur lors de la récupération des champs :", error);
            reject(error);
        }
    });
};


export default {
    hSetJsonData,
    hGetJsonData,
    hDelJsonData,
    hGetAllFields
}