import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import {ScriptRunner} from "../components/scriptrunner"
import {TXMonitor} from "../components/txmonitor";
import {newFlowLogTransaction} from "../lib/flow/txlogevent";

export const Hello = () => {
    const [user, setUser] = useState({loggedIn: null})
    const [transactionId, setTransactionId] = useState(null)

    var msg = `hello`;

    useEffect(() => fcl.currentUser.subscribe(setUser), [])


    // NEW
    const executeTransaction = async () => {
        await newFlowLogTransaction(msg, setTransactionId)
    }

    const AuthedState = () => {
        return (
            <div>

                <div>
                    <TXMonitor txID={transactionId} onSuccess={()=>{}}></TXMonitor>
                </div>
                <div>
                    <h3> Log Event Message: </h3>
                    <input defaultValue={msg} onChange={(e) => {msg = e.target.value}}/>
                </div>
                <button onClick={executeTransaction}>run log transaction</button>
            </div>
        )
    }

    return (
        <div>
            <ScriptRunner></ScriptRunner>

            <hr />

            {user.loggedIn ? <AuthedState /> : <div>log in to run transaction</div>}
        </div>
    )
}

