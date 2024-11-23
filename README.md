### Task React App
## Kurulum
İlk önce projeyi sonrasında ise [Task-Api](https://github.com/nazms23/task-api) 'yi kurun
# Proje
1. Projeyi klonlayın.
2. Terminalden projeye gidin ve **npm install** yazıp paketleri yükleyin.
3. **npm start** ile projeyi başlatın.

# Task-Api
1. Projeyi [bu bağlantıdan](https://github.com/nazms23/task-api) klonlayın.
2. Dotnet 7 sürümüne sahipseniz terminalden proje klasörüne gidin ve **dotnet watch** yazarak başlatın.
3. Dotnet 7 sürümüne sahip değilseniz [bu bağlantıdan](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) indirebilirsiniz.

# Api bağlantısını projeye ekleme
1. Apiyi terminale **dotnet watch** yazarak çalıştırın.
>Now listening on: http://localhost:XXXX
2. Bu yazıdan portunuzu öğrendikten sonra Task React projesinin klasörüne gidin.
> src/redux/apiSlice.js
3. Dosyasını açın, initial state objesinin içindeki url kısmına http://localhost:XXXX/api/ şeklinde yazın.
4. Projeyi **npm start** yazarak çalıştırın.

## Kullanım
# Sign Up Sayfası
1. Username
    - Doldurulması gerekli.
    - Aynı kullanıcı adı ile kayıt olunamaz.
2. Email
    - Doldurulması gerekli.
    - Aynı email ile kayıt olunamaz.
3- Password
    - Minimum 6 karakter olmalı.
    - Alfanümerik olmayan karakter içeremez.
4- Confirm Password
    - Şifre ile aynı olmalıdır.
# Login Sayfası
1. Email
2. Password

# Home Sayfası
1. Id Selectbox
    - **Select** seçili iken tüm tasklar gelir.
    - "X" herhangi bir id seçili iken sadece o idye ait task gelir.
    - Id seçildiğinde arama kutusundaki **yazı sıfırlanır**.
    - Id seçildiğinde sayfa numarası **1** olur.
2. Search Input
    - Boşken tüm tasklar gelir.
    - Arama kutusu **TITLE ve DESCRIPTION** 'a göre arar.
    - Aramaya herhangi bir şey yazıldığında Id Selectbox **Select** durumuna gelir.
    - Aramaya herhangi bir şey yazıldığında sayfa numarası **1** olur.
3. Sort
    - **Oldest** seçiliyken en eskiden en yeniye tasklar sıralanır. **Varsayılan olarak seçili gelir.**
    - **Newest** seçiliyken en yeniden en eskiye tasklar sıralanır.
4. Task
    - **Title** veya **Description** sonunda **...** olan taskların üzerine tıklandığında genişler.
5. Sayfalama
    - Buton **<** 1 önceki sayfayı açar. **Sayfa numarası 1 ise çalışmaz.**
    - **Sayfa numarası** bulunulan sayfayı göstertir.
    - Buton **>** 1 sonraki sayfayı açar. **Sayfa numarası olabilcek en fazla sayfa sayısına eşit ise çalışmaz.**
# Giriş Yapılıyken Home Sayfası
1. Header
    - **Logout** Hesapdan çıkış yapmaya yarar.
    - **Username** Logout butonun solundadır. Kullanıcı adınızı görüntüler.
2. Delete
    - Taskı silmeye yarar.
3. Edit
    - Edit modunu açıp kapatmaya yarar.
    - Edit Modu
        - Title ve Descriptionu inputlar ile değiştirir ve düzenleyebilme imkanı sunar.
4. Save
    - Edit modu açılıyken gözükür.
    - Yapılan değişiklikleri kaydetmeye yarar.
5. Add New Task
    - **Title**
        - Boş bırakılamaz.
    - **Description**
        - Boş Bırakılabilir.
