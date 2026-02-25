<?php
session_start(); // Inicia a sessão para guardar os dados
include('config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Busca o usuário pelo e-mail
    $stmt = $conn->prepare("SELECT nome, senha FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        // Verifica se a senha criptografada bate
        if (password_verify($senha, $user['senha'])) {
            // Cria as variáveis de sessão
            $_SESSION['logado'] = true;
            $_SESSION['nome'] = $user['nome'];

            // Redireciona para a tela principal (fora da pasta /login)
            header("Location: ../index.html");
            exit();
        } else {
            echo "<script>alert('Senha incorreta!'); window.history.back();</script>";
        }
    } else {
        echo "<script>alert('Usuário não encontrado!'); window.history.back();</script>";
    }
}
?>