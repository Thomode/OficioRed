using Firebase.Auth;
using Firebase.Storage;

namespace OficioRed.Helpers;

public class FirebaseStorageManeger
{
    // CREDENCIALES
    private const string email = "figueroalopeztomas@gmail.com";
    private const string clave = "OficioRed";
    private const string ruta = "oficiored.appspot.com";
    private const string api_key = "AIzaSyAG9Eb5fgsfiieCe0MHOjDyv51O_4LcQ6c";

    public async Task<string> SubirStorage(Stream archivo, string nombre)
    {
        var auth = new FirebaseAuthProvider(new FirebaseConfig(api_key));
        var a = await auth.SignInWithEmailAndPasswordAsync(email, clave);

        var cancellation = new CancellationTokenSource();

        var task = new FirebaseStorage(
            ruta,
            new FirebaseStorageOptions
            {
                AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                ThrowOnCancel = true
            })
            .Child("Fotos_Perfil")
            .Child(nombre)
            .PutAsync(archivo, cancellation.Token);

        var downloadURL = await task;

        return downloadURL;
    }
}
