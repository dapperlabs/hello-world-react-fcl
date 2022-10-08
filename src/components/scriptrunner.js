import { useState } from "react";
import * as fcl from "@onflow/fcl";

export const ScriptRunner = () => {
    const [scriptResult, setScriptResult] = useState(null)

    var queryScript = `pub fun main(argUseless: String): UInt64 { return getCurrentBlock().height }`;

    const sendQuery = async () => {
        try {
            const result = await fcl.query({
                cadence: queryScript,
                args: (arg, t) => [
                    arg("useless", t.String)
                ]
            })

            setScriptResult(result)
        } catch (e) {
            console.log(e.toString())
            setScriptResult(e.toString())
        }
    }


    return (
        <div>
            <div>
                <h3> Script Code: </h3>
                <textarea rows="6" cols="70" defaultValue={queryScript} onChange={(e) => {queryScript = e.target.value}} />
            </div>
            <button onClick={sendQuery}>Execute Script</button>
            <div>
                <h3> Script Execution Result: </h3>
                {scriptResult ?? "--"}
            </div>
        </div>
    )
}

