import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

function Home(props) {
  const [ usuario, setUsuario ] = useState('');
  const [ erro, setErro ] = useState(false);
  const history = useHistory();

  function handlePesquisa() {
    const API_URL = `https://api.github.com/users/${usuario}/repos`;
    axios.get(API_URL).then(response => {
      const repositories = response.data;
      const repositoriesName = [];
      repositories.map((repository) => {
        repositoriesName.push(repository.name);
      });
     localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
     setErro(false);
      history.push('/repositories');
    }).catch(err => {
      setErro(true);
    });
  }

  return (
    <S.ContainerHome>
      <S.Content>
        <S.Input className="inputUsuario" placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)}/>
        <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button> 
      </S.Content>
      { erro ?   <S.ErrorMsg>Ocorreu um erro. Tente novamente</S.ErrorMsg> : ''}
    </S.ContainerHome>
  );
}

export default Home;
