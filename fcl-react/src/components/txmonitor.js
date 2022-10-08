import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import {Row, Col} from "react-bootstrap"

export const TXMonitor = (props) => {
  const [transactionStatus, setTransactionStatus] = useState(null)
  const [transactionEvents, setTransactionEvents] = useState([])
  const [transactionId, setTransactionId] = useState(null)
  const [transactionError, setTransactionError] = useState(null)


  useEffect(() => {
    let txID = props.txID
    setTransactionId(txID)
    txID != null && fcl.tx(txID).subscribe((txResUpdate)=> {
      console.log(txResUpdate)
      setTransactionEvents(txResUpdate.events);
      setTransactionStatus(txResUpdate.statusString)
      if (txResUpdate.status === 4 && txResUpdate.errorMessage === '') {
        props.onSuccess()
      }
      setTransactionError(txResUpdate.errorMessage)
    })
  
  }, [props])

  return                       <Row>
  <Col>
    <div>
      <h3> Transaction ID: </h3>
      <a href={'https://flowscan.org/transaction/' + transactionId}>
        {transactionId ?? "--"}
      </a>
      <h3> Transaction Status: {transactionStatus ?? "--"}</h3>
      <h3> Transaction Error: {transactionError ?? "--"}</h3>
    </div>

  </Col>

  <Col>
    <h3> Transaction Events: </h3>
    {transactionStatus === "SEALED" && transactionEvents && !!transactionEvents.length && (
      <div>
        <ul>
          {
            transactionEvents.map((e) => {
              return (
                <li key={`${e.transactionId}-${e.transactionIndex}-${e.eventIndex}`}>
                  {e.type}
                </li>
              )
            })
          }
        </ul>
      </div>
    )}

  </Col>

</Row>

}
