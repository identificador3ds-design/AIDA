import cv2
import numpy as np
import matplotlib.pyplot as plt

def calcular_fft_espectro(imagem_cinza):
    """
    Calcula a FFT 2D da imagem, centraliza e retorna o espectro de magnitude
    em escala logarítmica para visualização.
    """
    # FFT 2D
    f = np.fft.fft2(imagem_cinza)
    # Centraliza (baixas frequências vão para o centro)
    fshift = np.fft.fftshift(f)
    # Espectro de magnitude
    magnitude = np.abs(fshift)
    # Escala logarítmica para melhor visualização
    magnitude_log = np.log1p(magnitude)  # log(1 + magnitude)
    return fshift, magnitude, magnitude_log

def separar_regioes_frequencia(shape, raio):
    """
    Cria máscaras para baixas frequências (dentro do círculo central)
    e altas frequências (fora do círculo).
    Retorna as máscaras como booleanos.
    """
    h, w = shape
    centro = (h // 2, w // 2)
    # Cria uma grade de coordenadas
    Y, X = np.ogrid[:h, :w]
    # Distância ao centro
    dist_centro = np.sqrt((X - centro[1])**2 + (Y - centro[0])**2)
    # Máscara de baixas frequências (dentro do raio)
    mascara_baixas = dist_centro <= raio
    # Máscara de altas frequências (complemento)
    mascara_altas = ~mascara_baixas
    return mascara_baixas, mascara_altas

def calcular_metricas(magnitude, mascara):
    """
    Calcula soma das magnitudes e energia (soma dos quadrados) para uma região.
    """
    regiao = magnitude[mascara]
    soma = np.sum(regiao)
    energia = np.sum(regiao**2)
    return soma, energia

def main():
    # ============================================================
    # 1. Configuração inicial: caminho da imagem
    # ============================================================
    # Substitua pelo caminho da sua imagem
    caminho_imagem = "p.png"  # <-- ALTERE AQUI

    # ============================================================
    # 2. Carregar a imagem com OpenCV
    # ============================================================
    imagem = cv2.imread(caminho_imagem)
    if imagem is None:
        print(f"Erro: Não foi possível carregar a imagem em {caminho_imagem}")
        return

    # Converter para escala de cinza se necessário
    if len(imagem.shape) == 3:
        imagem_cinza = cv2.cvtColor(imagem, cv2.COLOR_BGR2GRAY)
    else:
        imagem_cinza = imagem

    # ============================================================
    # 3. Calcular a FFT e obter espectros
    # ============================================================
    fshift, magnitude, magnitude_log = calcular_fft_espectro(imagem_cinza)

    # ============================================================
    # 4. Definir raio para separar baixas e altas frequências
    # ============================================================
    h, w = imagem_cinza.shape
    # Usaremos 1/4 da menor dimensão como raio (pode ser ajustado)
    raio = min(h, w) // 4

    # ============================================================
    # 5. Criar máscaras e calcular métricas
    # ============================================================
    masc_baixas, masc_altas = separar_regioes_frequencia((h, w), raio)

    # Cálculo para baixas frequências
    soma_baixas, energia_baixas = calcular_metricas(magnitude, masc_baixas)
    # Cálculo para altas frequências
    soma_altas, energia_altas = calcular_metricas(magnitude, masc_altas)

    # ============================================================
    # 6. Exibir resultados no console
    # ============================================================
    print("="*50)
    print("ANÁLISE DE FREQUÊNCIAS (valores reais da magnitude)")
    print(f"Raio utilizado para separação: {raio} pixels")
    print("-"*50)
    print("Baixas frequências (centro):")
    print(f"  Soma das magnitudes : {soma_baixas:.2f}")
    print(f"  Energia (soma dos quadrados): {energia_baixas:.2f}")
    print("Altas frequências (bordas):")
    print(f"  Soma das magnitudes : {soma_altas:.2f}")
    print(f"  Energia (soma dos quadrados): {energia_altas:.2f}")
    print("="*50)

    # ============================================================
    # 7. Visualização com Matplotlib
    # ============================================================
    plt.figure(figsize=(12, 6))

    # Subplot 1: Imagem original em tons de cinza
    plt.subplot(1, 2, 1)
    plt.imshow(imagem_cinza, cmap='gray')
    plt.title("Imagem Original (Escala de Cinza)")
    plt.axis('off')

    # Subplot 2: Espectro de magnitude (escala log)
    plt.subplot(1, 2, 2)
    plt.imshow(magnitude_log, cmap='gray')
    plt.title("Espectro de Magnitude da FFT (escala log)")
    plt.axis('off')

    # Adicionar texto com as métricas na própria figura
    texto_metricas = (
        f"Baixas frequências:\n"
        f"Soma = {soma_baixas:.2e}\n"
        f"Energia = {energia_baixas:.2e}\n\n"
        f"Altas frequências:\n"
        f"Soma = {soma_altas:.2e}\n"
        f"Energia = {energia_altas:.2e}"
    )
    plt.gcf().text(0.5, 0.02, texto_metricas, ha='center', fontsize=10,
                   bbox=dict(boxstyle="round,pad=0.5", facecolor="lightyellow"))

    plt.tight_layout(rect=[0, 0.1, 1, 0.95])  # Ajusta layout para não sobrepor texto
    plt.show()

if __name__ == "__main__":
    main()