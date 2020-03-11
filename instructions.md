Sovellusta voi käyttää joko tuotteiden ostamiseen tai niiden myymiseen, riippuen onko käyttäjä kauppa (myyjä) vai kuluttaja.
Sovelluksen etusivulla on lyhyt esittelyteksti sekä linkit tutustumissivuille, joista kauppa tai kuluttaja voi lukea lisätietoa Shelpiin liittyen (Order / Sell -linkit).

<h4>Kaupan rooli:</h4>
Kauppa voi kirjautua Shelpin käyttäjäksi (Shop Login, sign up). Rekisteröitymisvaiheessa kysytään mm. kaupan osoitetta. Jos osoite on oikea ja olemassa, voi kauppa lisätä koordinaattinsa kaupan tietoihin. Jos kaupan tiedoissa on koordinaatit, näkyvät nämä kaupat sovelluksen karttanäkymässä. Karttanäkymässä käytetään MapBoxin karttoja (https://www.mapbox.com). Koordinaattien haku toimii MapBoxin Geocoding API:n avustuksella. Tämän avulla sovellus etsii koordinaatit katuosoitteen, postinumeron ja kaupungin perusteella. Jos haku ei tuota 100% oikeaa hakutulosta, koordinaatteja ei lisätä kaupan tietoihin automaattisesti.
Kauppaa rekisteröidessä, kaupan nimi tulee olla uniikki, sillä se toimii myös sisäänkirjautuessa käyttäjänimenä. Rekisteröintivaiheessa tulee ilmoitus, jos nimi on jo käytössä (mongoose-unique-validator).

Sisäänkirjautuminen on tehty käyttäen token-perustaista autentikointia.
Kaupan sisäänkirjautumissivulla voi muokata kyseisen kaupan myynnissä olevia tuotteita (Products on sale), lisätä tuotteita (Add products), selata jo ostettuja tuotteita (Bought Products) ja nähdä ne tuotteet, joiden käyttöpäivämäärä on vanhentunut (Expired products). Sovellus tarkastaa tuotteiden päivämäärät ja poistaa automaattisesti ne tuotteet myynnistä, joiden käyttöpvm on mennyt (ei enää kyseinen päivä tai myöhempi). Vanhentuneen tuotteen päivämäärää voi muokata jälkeenpäin, jos tuotteen haluaa helposti uudelleen myyntiin.
Kauppa voi myös muokata tietojaan jälkeenpäin, tai poistaa rekisteröitymisen kokonaan (Manage Shop). Poistamiseen tarvitaan salasanavahvistus. Rekisteröitymisen poistaminen poistaa kaupan kaikki tuotteet, ovat ne sitten myynnissä tai vanhentuneet.

Tuotteen lisäys. Tuotetta lisätessä annetaan sille alennusprosentti, 0-90% väliltä. Sovellus laskee uuden hinnan alennusprosentin perusteella. Tuotetta lisätessä on kuva myös pakollinen. Tämän käyttäjä voi ladata tietokoneeltaan / puhelimestaan tuotetta lisätessään. Kaikki tuotteen ominaisuuksia voi muokata jälkikäteen, kunhan se on vielä myynnissä. Myynnissä olevan tuotteen voi myös poistaa jälkikäteen helposti.

<h4>Käyttäjän näkökulma:</h4>
Sovelluksen etusivun alaosassa on näkyvillä max. 5 tuotetta, joiden käyttöpäivämäärä on kauimpana nykyhetkessä, eli ovat tuoreimpia
sovelluksessa myytäviä tuotteita. Tämän lisäksi tuotteita voi myös selailla karttanäkymässä tai listanäkymässä.
Listanäkymä (All Products) listaa kaikki myynnissä olevat tuotteet. Tuotteita voi filtteröidä kaupan perusteella, jolloin hakutuloksen perusteella näkyvät vain tietyn kaupan tuotteet. 

Karttanäkymässä (See Map) näkyvät vain ne kaupat, joiden tiedoissa on koordinaatit. Tästä huolimatta kartan vasemmalla puolella olevassa ikkunassa näkyvät kuitenkin kaikkien kauppojen tuotteet. Kartassa on merkki siinä kohdalla, jossa kauppa sijaitsee. Merkin päällä näkyy numero, joka kertoo kuinka monta tuotetta kaupalla on myynnissä. Merkkiä klikatessa näkyy kaupan tiedot ja kyseisen kaupan myynnissä olevat tuotteet. Myös listalta tiettyä tuotetta klikatessa avautuu sama näkymä.

Kuluttaja voi lisätä haluamansa tuotteet ostoskoriin (Cart), jossa niitä voi jälkikäteen poistella. Ostoskorista pääsee 'Checkout' -vaiheeseen, jossa kysytään ostajan tietoja. Kun tiedot ovat oikein, tarkastaa sovellus vielä ennen ostovaihetta, että kyseiset tuotteet ovat varmasti vielä myynnissä (ettei tule samanaikaista ostotapahtumaa), ja PayPal -ostonappula ilmestyy. (PayPal Sandboxin käyttäjätunnus: shelpcustomer@gmail.com, salasana: 12345678).
Jos ostotapahtuma on onnistunut, poistuvat nämä tuotteet myynnistä ja siirtyvät kaupan sisäänkirjautumissivulla myytyihin tuotteisiin, jossa näkyvät ostajan tiedot.

Sovelluksen Backend on tehty Nodella, ja backendiä testattu Jestillä ja Supertest -kirjastolla.

Front End on tehty käyttäen mm. Redux-Thunk, React-Router, React-PayPal-Button ja ulkonäöstä vastaa osittain Bootstrap ja Semantic-UI-React.
Frontia on testattu Cypressilla ja React Testing Librarylla. Testit ovat melko niukat.