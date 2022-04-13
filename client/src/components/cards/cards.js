import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        title={props.name}
        endereco={props.endereco}
        descritivo={props.descritivo}
        urllogo={props.urllogo}
        nomeresp={props.nomeresp}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h1 className="card-title">{props.name}</h1>
        <p className="card-id">{props.id}</p>
        <p className="card-cartegory">{props.endereco}</p>
        <p className="card-cartegory">{props.descritivo}</p>
        <p className="card-cartegory">{props.urllogo}</p>
        <p className="card-cartegory">{props.nomeresp}</p>
        
      </div>
    </>
  );
}
