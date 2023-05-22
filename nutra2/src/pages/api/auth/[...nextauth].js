import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'

export const authOptions={
    providers:[
        GoogleProvider({
           clientId:'113428083425-l01i895non3rjt71bk3eqnfo4nbdcal0.apps.googleusercontent.com',
           clientSecret:'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' 
        }),
    ],
   
};

export default NextAuth(authOptions);
 