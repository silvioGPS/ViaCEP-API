// src/components/BuscaCep.jsx
// Campos mapeados do Endereco.java:
// cep, logradouro, complemento, unidade, bairro,
// localidade, uf, estado, regiao, ibge, gia, ddd, siafi

import { useState } from 'react';
import { buscarEndereco } from '../services/cepService';

export default function BuscaCep() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  // Formata enquanto digita: 00000-000
  function handleChange(e) {
    let valor = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (valor.length > 5) valor = valor.slice(0, 5) + '-' + valor.slice(5);
    setCep(valor);
  }

  async function handleBuscar() {
    if (!cep.trim()) return;
    setLoading(true);
    setErro('');
    setEndereco(null);

    try {
      const dados = await buscarEndereco(cep);
      setEndereco(dados);
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleBuscar();
  }

  function handleLimpar() {
    setCep('');
    setEndereco(null);
    setErro('');
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="logo">📮</div>
        <div>
          <h1>Consulta de CEP</h1>
          <p className="subtitle">Powered by ViaCEP + Spring Boot</p>
        </div>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="00000-000"
          value={cep}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={erro ? 'input-error' : ''}
          disabled={loading}
        />
        <button onClick={handleBuscar} disabled={loading || !cep.trim()} className="btn-primary">
          {loading ? <span className="spinner" /> : 'Buscar'}
        </button>
        {(endereco || erro) && (
          <button onClick={handleLimpar} className="btn-secondary">Limpar</button>
        )}
      </div>

      {erro && (
        <div className="alert alert-error">
          <span>⚠</span> {erro}
        </div>
      )}

      {endereco && (
        <div className="resultado">
          {/* Linha principal */}
          <div className="resultado-header">
            <span className="cep-badge">{endereco.cep}</span>
            {endereco.ddd > 0 && (
              <span className="ddd-badge">DDD {endereco.ddd}</span>
            )}
          </div>

          {/* Endereço */}
          <div className="section">
            <h2 className="section-title">Endereço</h2>
            <div className="grid-2">
              <Campo label="Logradouro" valor={endereco.logradouro} />
              <Campo label="Complemento" valor={endereco.complemento} />
              <Campo label="Unidade" valor={endereco.unidade} />
              <Campo label="Bairro" valor={endereco.bairro} />
            </div>
          </div>

          {/* Localização */}
          <div className="section">
            <h2 className="section-title">Localização</h2>
            <div className="grid-3">
              <Campo label="Cidade" valor={endereco.localidade} destaque />
              <Campo label="Estado" valor={endereco.estado} destaque />
              <Campo label="UF" valor={endereco.uf} destaque />
              <Campo label="Região" valor={endereco.regiao} />
            </div>
          </div>

          {/* Dados técnicos */}
          <div className="section">
            <h2 className="section-title">Dados técnicos</h2>
            <div className="grid-3">
              <Campo label="IBGE" valor={endereco.ibge} mono />
              {endereco.gia > 0 && <Campo label="GIA" valor={endereco.gia} mono />}
              {endereco.siafi > 0 && <Campo label="SIAFI" valor={endereco.siafi} mono />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente auxiliar para cada campo
function Campo({ label, valor, destaque, mono }) {
  if (!valor && valor !== 0) return null;
  return (
    <div className={`campo ${destaque ? 'campo-destaque' : ''}`}>
      <span className="campo-label">{label}</span>
      <span className={`campo-valor ${mono ? 'mono' : ''}`}>{valor}</span>
    </div>
  );
}