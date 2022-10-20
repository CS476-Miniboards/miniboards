import React from "react";
import { Table } from "react-bootstrap";

export class RealtimeData extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
    }

    componentDidMount(){
        const dbRef = ref(db, 'games/999/scores');
        
        onValue(dbRef, (snapshot)=>{
            let records = [];
            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key": keyName, "data": data});
            });
            this.setState({tableData: records});
        });
    }

// game is the node
// deleted index from map
    render(){
        return(
            <Table>
                <thead>
                    <tr>Game1 LeaderBoard</tr>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.tableData.map((row) => {
                        return(
                            <tr>
                                <td>{row.key}</td>
                                <td>{row.data.name}</td>
                                <td>{row.data.score}</td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </Table>
        )
    }
}