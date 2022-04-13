import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/cards";

export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterRestaurante = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      endereco: values.endereco,
      descritivo: values.descritivo,
      urllogo: values.urllogo,
      nomeresp: values.nomeresp,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        endereco: values.endereco,
        descritivo: values.descritivo,
        urllogo: values.urllogo,
        nomeresp: values.nomeresp,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            name: values.name,
            endereco: values.endereco,
            descritivo: values.descritivo,
            urllogo: values.urllogo,
            nomeresp: values.nomeresp,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Jason's food</h1>
        <h3 className="register-title">Cadastro Restaurante</h3>
        
        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Endereço"
          name="endereco"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Descrição"
          name="descritivo"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Url da logo"
          name="urllogo"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Nome do Responsável"
          name="nomeresp"
          className="register-input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterRestaurante} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          name={val.name}
          endereco={val.endereco}
          descritivo={val.descritivo}
          urllogo={val.urllogo}
          nomeresp={val.nomeresp}
        />
      ))}
    </div>
  );
}
