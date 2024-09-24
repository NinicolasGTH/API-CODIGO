const url = "https://go-wash-api.onrender.com/api/user"; 

async function cadastroUsuario() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let terms = document.getElementById('terms').checked;
    let birthday = document.getElementById('birthday').value;

    let api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "email": email,
            "user_type_id": 1,
            "password": password, 
            "cpf_cnpj": cpf_cnpj,
            "terms": terms,
            "birthday": birthday 
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (api.ok) {
        let resposta = await api.json();
        console.log(resposta);
        console.log("Cadastro realizado com sucesso!");
        alert("Cadastro realizado com sucesso! Enviamos um link de verificação no seu email");
    } else {
        let respostaErro = await api.json();
        
        if (respostaErro.data.errors) {
            console.log(respostaErro.data.errors.cpf_cnpj, respostaErro.data.errors.email, respostaErro.data.errors.password);
        }
        alert("Erro");
    }
    }