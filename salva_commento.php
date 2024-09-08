<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = htmlspecialchars($_POST['nome']);
    $commento = htmlspecialchars($_POST['commento']);
    $data = date('Y-m-d H:i:s');

    // Creiamo il commento da salvare
    $nuovo_commento = [
        'nome' => $nome,
        'commento' => $commento,
        'data' => $data
    ];

    // Convertiamo il commento in formato JSON
    $commento_json = json_encode($nuovo_commento) . "\n";

    // Salviamo il commento in un file (commenti.txt)
    file_put_contents('commenti.txt', $commento_json, FILE_APPEND);

    // Restituisce un risultato di successo
    echo 'success';
}
?>

