import React from 'react';
import {Card, CardText, CardBody, CardTitle} from 'reactstrap';

const TextView = (props) => {
    const op = props.children || "Output will be displayed here.";
    return(
        <div>
            <Card>
                <CardBody>
                    <CardTitle>Output</CardTitle>
                    <CardText className={props.isError ? "text-danger" : "text-dark"}>{op}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default TextView;