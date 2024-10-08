const url = "https://go-wash-api.onrender.com/api/user"; 

async function cadastroUsuario() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpf_cnpj = document.getElementById('cpf').value;
    let terms = document.getElementById('terms').checked;
    let birthday = document.getElementById('birthday').value;

    if (password.length < 6) {
        alert("A senha deve ter no mínimo 6 caracteres");
        return;
    }

    // verificação dos dados que estão sendo informados
    console.log({
        "name": name,
        "email": email,
        "user_type_id": 1,
        "password": password,
        "cpf_cnpj": cpf_cnpj,
        "terms": terms,
        "birthday": birthday 
    });

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
        alert("Cadastro realizado com sucesso! Enviamos um link de verificação no seu email");
    } else {
        let respostaErro = await api.json();
        console.log(respostaErro); // mostrando o possível erro que pode se dar. Mostrado no console

        if (respostaErro.data && respostaErro.data.errors) {
            if (respostaErro.data.errors.email) {
                alert(`Erro: O email ${email} já está em uso`);
            }
            if (respostaErro.data.errors.cpf_cnpj) {
                alert(`Erro: O CPF/CNPJ ${cpf_cnpj} já está em uso`);
            }
        } else {
            alert("Erro ao realizar o cadastro. Tente novamente.");
        }
    }
}
