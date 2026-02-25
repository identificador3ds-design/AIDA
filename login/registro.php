<?php
include('config.php'); // 'include' em vez de 'incluir'

if ($_SERVER["REQUEST_METHOD"] == "POST") { // 'if' em vez de 'se'
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

    // SQL sempre em inglês: 'VALUES' em vez de 'VALORES'
    $sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nome, $email, $senha);

    if ($stmt->execute()) {
        echo "<script>alert('Cadastrado com sucesso!'); window.location.href='index-login.html';</script>";
    } else { // 'else' em vez de 'outro'
        echo "Erro: " . $stmt->error;
    }
}
?>