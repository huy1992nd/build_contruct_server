module.exports = {
  SERVER: {
    PORT: "3300"
  },
  KEY_CLOAK: {
    CLIENT_SECRET: "5dff041f-2475-4874-bede-7d5ee076481a",
    REALMS_KEYCLOAK_CONFIG: {
      clientId: "account",
      bearerOnly: true,
      serverUrl: "'https://sso.rsaprovider.tk/auth",
      realm: "providerapp",
      realmPublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu5ITrHxukGEU3K9iFPF/TnBITqje47/KTenzWAp5X2lMmOBukSUkcg5iUz6RaDGabvpD8K+oPZ9s509Q5Kdy4X4FGVcNoVv+HsfQ3+ZS1CPTMAvjm7eq5y032ffWL3twDJjtHsMrjrUFwziqXhSG84zJ3zY36k6V6lMrRRswfoZN/LKyUk5jTNolUQ2OLIBGiBvQMsVPzMPFmRW554iuVGHPB3g0Oa4XtKbDQnI8qdwAGUf/GuIE98LBlXKBKgVE7+AVtM6xT3eHjWj2bexeCy7C8JbfN017/MjyOWKWync9aMI2pz2SMzdpayb0YOAykMlZYCyr2PZ9PhQSD9iOqQIDAQAB"
    }
  }
}