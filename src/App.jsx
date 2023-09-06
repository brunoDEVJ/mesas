import React, { useState } from 'react';
import './styles.css';

class Mesa {
  constructor(numero) {
    this.numero = numero;
    this.produtos = [];
    this.idprod = 1;
  }

  adicionarProduto(produto) {
    const novoProduto = { ...produto, idprod: this.idprod };
    this.produtos.push(novoProduto);
    this.idprod++;
  }

  removerProduto(index) {
    if (index >= 0) {
      this.produtos.splice(index, 1);
    }
  }
}

const GRUPOS_PRODUTOS = [
  {
    id: 1,
    descricao: 'bebidas',
    produtos: [
      {
        id: 1,
        descricao: 'Coca-Cola 2L',
        valor: 10,
      },
      {
        id: 2,
        descricao: 'Pepsi',
        valor: 8.99,
      },
      {
        id: 3,
        descricao: 'Delrey',
        valor: 7.99,
      },
      {
        id: 4,
        descricao: 'Guarana',
        valor: 6.80,
      },
      // Outros produtos de bebidas
    ],
  },
  {
    id: 2,
    descricao: 'pizzas',
    produtos: [
      {
        id: 1,
        descricao: 'Palmito',
        valor: 39.87,
      },
      {
        id: 2,
        descricao: 'Bacon',
        valor: 32,
      },
      {
        id: 3,
        descricao: 'Portuguesa',
        valor: 35.58,
      },
      {
        id: 4,
        descricao: 'Frango',
        valor: 40,
      },
      // Outros produtos de pizzas
    ],
  },
  {
    id: 3,
    descricao: 'doces',
    produtos: [
      {
        id: 1,
        descricao: 'Diamante Negro',
        valor: 6.50,
      },
      {
        id: 2,
        descricao: 'Talento',
        valor: 5.20,
      },
      {
        id: 3,
        descricao: 'Paçoca',
        valor: 1.50,
      },
      {
        id: 4,
        descricao: 'Bolo Pote',
        valor: 12,
      },
      // Outros produtos de doces
    ],
  },
  {
    id: 4,
    descricao: 'mercado',
    produtos: [
      {
        id: 1,
        descricao: 'Leite',
        valor: 8,
      },
      {
        id: 2,
        descricao: 'Macarrão',
        valor: 5.50,
      },
      {
        id: 3,
        descricao: 'Pente de Ovo',
        valor: 17,
      },
      {
        id: 4,
        descricao: 'Arroz 2KG',
        valor: 10,
      },
      {
        id: 5,
        descricao: 'Feijão',
        valor: 8,
      },
      // Outros produtos de mercado
    ],
  },
];

function Produto({ produto, onAdicionar }) {
  return (
    <div className='mesa' onClick={() => onAdicionar(produto)}>
      <span>{produto.id}</span>
      <span>{produto.descricao}</span>
      <span>Preço: R${produto.valor}</span>
    </div>
  );
}

function App() {
  const [mesas, setMesas] = useState([]);
  const [mesaSelecionada, setMesaSelecionada] = useState(null);
  const [grupoProduto, setGrupoProduto] = useState('');

  const criarMesa = () => {
    const novaMesa = new Mesa(mesas.length + 1);
    setMesas([...mesas, novaMesa]);
  };

  const adicionarProdutoAMesa = (produto) => {
    if (mesaSelecionada !== null) {
      const mesaAtual = mesas[mesaSelecionada - 1];
      mesaAtual.adicionarProduto(produto);
      setMesas([...mesas]);
    }
  };

  const removerProdutoDaMesa = (index) => {
    if (mesaSelecionada !== null) {
      const mesaAtual = mesas[mesaSelecionada - 1];
      mesaAtual.removerProduto(index);
      // Atualize o estado das mesas para refletir a remoção
      setMesas([...mesas]);
    }
  };

  const mesaAtual = mesaSelecionada !== null ? mesas[mesaSelecionada - 1] : null;

  return (
    <div className='container'>
      <div className='painelMesas'>
        <button className='btnCriar' onClick={criarMesa}>Criar mesa</button>
      </div>

      {mesas.length !== 0 && (
        <div className='containerMesa'>
          <div className='subTitle'>
            <h3>Mesas</h3>
          </div>
          {mesas.map((mesa) => (
            <div className='mesa' key={mesa.numero} onClick={() => { setMesaSelecionada(mesa.numero) }}>
              <span>Icon</span>
              <span>Mesa: {mesa.numero}</span>
            </div>
          ))}
        </div>
      )}

      {mesaSelecionada !== null && (
        <div className='containerMesa'>
          <div className='subTitle'>
            <h3>Grupos Produto</h3>
          </div>

          {GRUPOS_PRODUTOS.map((grupo) => (
            <div className='mesa' key={grupo.id} onClick={() => { setGrupoProduto(grupo.descricao) }}>
              <span>{grupo.id}</span>
              <span>{grupo.descricao}</span>
            </div>
          ))}
        </div>
      )}

      {grupoProduto !== '' && (
        <div className='containerMesa'>
          <div className='subTitle'>
            <h3>Produto</h3>
          </div>

          {GRUPOS_PRODUTOS.find((grupo) => grupo.descricao === grupoProduto)?.produtos.map((produto) => (
            <Produto key={produto.id} produto={produto} onAdicionar={adicionarProdutoAMesa} />
          ))}
        </div>
      )}

      {mesaAtual && (
        <div className='containerMesa'>
          <table className='table'>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {mesaAtual.produtos.map((produto, i) => (
                <tr className='row' key={`${mesaSelecionada}${produto.id}${produto.idprod}`}>
                  <td>{produto.descricao}</td>
                  <td>R$ {produto.valor.toFixed(2)}</td>
                  <td>
                    <button className='btnRemover' onClick={() => { removerProdutoDaMesa(i) }}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='total'>
            <span>TOTAL:</span>
            <span>R$ {mesaAtual.produtos.reduce((total, produto) => total + produto.valor, 0).toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
