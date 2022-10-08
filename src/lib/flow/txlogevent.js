import * as fcl from "@onflow/fcl";

export const newFlowLogTransaction = async(msg, setTxID) => {
    let txID = await fcl.mutate({
        cadence: `import Logger from 0xLOGGERADDRESS
    transaction(msg: String) {

      prepare(acct: AuthAccount) {}

      execute {
        Logger.log(msg: msg, data: nil)
      }
    }`,
        args: (arg, t) => [
            arg(msg, t.String)
        ],
        payer: fcl.authz,
        proposer: fcl.authz,
        authorizations: [fcl.authz],
        limit: 800
    })
    setTxID(txID)
}