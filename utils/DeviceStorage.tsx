import AsyncStorage from "@react-native-async-storage/async-storage";


export async function saveUserToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem('userToken', token);
    console.log('Token salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar o token do usuário:', error);
  }
}

export async function getUserToken(): Promise<string | null> {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token;
  } catch (error) {
    console.error("Erro ao obter o token do usuário:", error);
    return null;
  }
}
