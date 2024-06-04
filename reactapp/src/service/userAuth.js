import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints
export const userAuth = createApi({
  reducerPath: 'userAuth',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://127.0.0.1:8000/api/studnet1' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
        query:(user)=>{
        return{
            url:'register/',
            method:'POST',
            body: user,
            headers:{
                'Content-type': 'application/json',

        }
    }
}
    })

  }),
})
export const {useResgisterUserMuta } = userAuth
