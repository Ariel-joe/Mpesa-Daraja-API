import { getTokenAccess } from "./accessToken.js"

  const initiateSTKPush = async (phone, amount, reference) => {
    
    try {
        const accessToken = await getTokenAccess()
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, -5)

        const password = Buffer.from()
    } catch (error) {
        
    }

  }


