#!/bin/bash

echo "🧪 Testando APIs do CRUD de Usuários"
echo "======================================"
echo ""

BASE_URL="http://localhost:3000/api"

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}1. GET /api/usuarios - Listar todos os usuários${NC}"
echo "------------------------------------------------"
curl -s "$BASE_URL/usuarios" | jq '.[] | {nome, email, tipoUsuario, clientes: .clientesVinculados | length}'
echo ""

echo -e "${BLUE}2. GET /api/clientes - Listar apenas clientes${NC}"
echo "------------------------------------------------"
curl -s "$BASE_URL/clientes" | jq '.[] | {id, nome, email}'
echo ""

echo -e "${BLUE}3. POST /api/usuarios - Criar novo cliente${NC}"
echo "------------------------------------------------"
NOVO_CLIENTE=$(curl -s -X POST "$BASE_URL/usuarios" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Almeida",
    "email": "pedro.almeida@email.com",
    "telefone": "(11) 99999-9999",
    "cpf": "999.888.777-66",
    "idade": "30",
    "cep": "01310-300",
    "estado": "SP",
    "endereco": "Av. Paulista, 3000",
    "complemento": "Bloco B",
    "tipoUsuario": "cliente"
  }')

CLIENTE_ID=$(echo $NOVO_CLIENTE | jq -r '.id')
echo $NOVO_CLIENTE | jq '{id, nome, email, tipoUsuario}'
echo -e "${GREEN}✅ Cliente criado com ID: $CLIENTE_ID${NC}"
echo ""

echo -e "${BLUE}4. GET /api/usuarios/:id - Buscar usuário específico${NC}"
echo "------------------------------------------------"
curl -s "$BASE_URL/usuarios/$CLIENTE_ID" | jq '{nome, email, tipoUsuario, endereco}'
echo ""

echo -e "${BLUE}5. PUT /api/usuarios/:id - Atualizar para consultor${NC}"
echo "------------------------------------------------"
ATUALIZADO=$(curl -s -X PUT "$BASE_URL/usuarios/$CLIENTE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Almeida",
    "email": "pedro.almeida@email.com",
    "telefone": "(11) 99999-9999",
    "cpf": "999.888.777-66",
    "idade": "30",
    "cep": "01310-300",
    "estado": "SP",
    "endereco": "Av. Paulista, 3000",
    "complemento": "Bloco B",
    "tipoUsuario": "consultor",
    "clientesIds": []
  }')

echo $ATUALIZADO | jq '{nome, tipoUsuario}'
echo -e "${GREEN}✅ Usuário atualizado para consultor${NC}"
echo ""

echo -e "${BLUE}6. PUT /api/usuarios/:id - Voltar para cliente${NC}"
echo "------------------------------------------------"
REVERTIDO=$(curl -s -X PUT "$BASE_URL/usuarios/$CLIENTE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Almeida",
    "email": "pedro.almeida@email.com",
    "telefone": "(11) 99999-9999",
    "cpf": "999.888.777-66",
    "idade": "30",
    "cep": "01310-300",
    "estado": "SP",
    "endereco": "Av. Paulista, 3000",
    "complemento": "Bloco B",
    "tipoUsuario": "cliente"
  }')

echo $REVERTIDO | jq '{nome, tipoUsuario}'
echo -e "${GREEN}✅ Usuário revertido para cliente${NC}"
echo ""

echo -e "${BLUE}7. DELETE /api/usuarios/:id - Deletar usuário${NC}"
echo "------------------------------------------------"
DELETADO=$(curl -s -X DELETE "$BASE_URL/usuarios/$CLIENTE_ID")
echo $DELETADO | jq '.'
echo -e "${GREEN}✅ Usuário deletado${NC}"
echo ""

echo -e "${YELLOW}🎉 Todos os testes concluídos!${NC}"
