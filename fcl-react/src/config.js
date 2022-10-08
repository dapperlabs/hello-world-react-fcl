import { config } from "@onflow/fcl";
import { send as httpSend } from '@onflow/transport-http';

var c = config({
  "accessNode.api": "https://rest-mainnet.onflow.org", // mainnet
  // "accessNode.api": "https://rest-testnet.onflow.org", // Testnet
  // "accessNode.api": "http://localhost:8080", // Local
  // "accessNode.api": "https://access-mainnet-beta.onflow.org", // Mainnet grpc web

  // "discovery.wallet": "https://fcl-discovery.onflow.org/authn", // Mainnet blocto
  "discovery.wallet": "https://accounts.meetdapper.com/fcl/authn-restricted", // Mainnet dapper
  // "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Testnet blocto
  // "discovery.wallet": "https://staging.accounts.meetdapper.com/fcl/authn-restricted", // Testnet dapper
  // "discovery.wallet": "http://localhost:8002/fcl/authn?localUrl=https://localhost:4000/", // Local

  "discovery.wallet.method": "POP/RPC", // "HTTP/POST" for back channel

  // These configs are for debugging through the JS console in the browser
  "debug.accounts": false,
  "debug.signatures": false,
  "debug.resolved": false,
  'app.detail.title': 'Ashes',
  'sdk.transport': httpSend
});

c.put('0xLOGGERADDRESS', '0x7fd4058e3c3dac1a');
