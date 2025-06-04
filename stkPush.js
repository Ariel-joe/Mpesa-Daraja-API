import { getTokenAccess } from "./accessToken.js"

  const sendSTKPush = async () => {
    
    const token  = await getTokenAccess()
    const date = new Date();
      const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
      
      
      const shortCode = "174379"
      const passkey = ""

  }


