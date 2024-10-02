class ApiError extends Error{
    constructor(message,statuscode,errors=[]){
      super(message)
      this.statuscode=statuscode
      this.errors=errors
      this.message= message
      this.success =false
      this.data=null
}
}

export {ApiError}