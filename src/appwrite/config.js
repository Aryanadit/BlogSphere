// Database
import conf from '../conf/conf.js'
import { Client, TablesDB, ID, Query , Storage , Permission , Role } from 'appwrite'


export class Service{
    client = new Client()
    bucket 
    databases

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databases = new TablesDB(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }){
        try{
            return await this.databases.createRow({
                    databaseId: conf.appwriteDatabaseId,
                    tableId: conf.appwriteCollectionId,
                    rowId: slug || ID.unique(),
                    data: { 
                        title,
                        content,
                        featuredImage,
                        status,
                        userId
                    }
            })
        }
        catch(error){
            console.log('appwrite-config.js-createPost', error)
            throw error
        }
    }

    async updatePost(slug , { title , content, featuredImage, status }){
        try{
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug ,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            });
        }
        catch(error){
            console.log("appwrite-config.js-createPost-error",error)
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug ,
            })
            return true
        }
        catch(error){
            console.log("appwrite-config.js-deletePost-error",error)
            return false
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getRow({
            databaseId: conf.appwriteDatabaseId,
            tableId: conf.appwriteCollectionId,
            rowId: slug ,
            })
        }
        catch(error){
            console.log("appwrite-config-getPost-error",error)
            return false
        }
    }
    //only when status = active
    async getPosts( queries = [Query.equal('status','active')] ){
        try{
            return await this.databases.listRows({
            databaseId: conf.appwriteDatabaseId,
            tableId: conf.appwriteCollectionId,
            queries,
            })

        }
        catch(error){
            console.log('appwrite-config-getPosts-error',error)
        }
    }

    // File Upload Methods
    async uploadFile(file){
        try{
            return await this.bucket.createFile({
                bucketId : conf.appwriteBucketId,
                fileId : ID.unique(),
                file : file,
                permissions: [
                    Permission.read(Role.any())
                ]
            })
        }
        catch(error){
            console.log("appwrite service-Config-uploadFile-error",error)
            return false
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile({
                bucketId : conf.appwriteBucketId,
                fileId : fileId
            })
            return true
        }
        catch(error){
            console.log("appwrite service-Config-uploadFile-error",error)
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFileView({
            bucketId : conf.appwriteBucketId,
            fileId : fileId
        })
    }
}

const service = new Service()
export default service