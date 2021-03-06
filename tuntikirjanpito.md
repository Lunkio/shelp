| päivä | aika | mitä tein |
|:-----:|:----:|:-----:|
| 11.1. |  1   | Sovelluksen suunnittelu ja perusrungon teko, React Routerin ja Bootstrapin lisääminen projektiin |
| 11.1. |  1   | Reduxin ja json-serverin lisäys |
| 12.1. |  2   | Ostoskorikomponentin tekoa ja testien aloittamista |
| 20.1. |  0.5 | Reducer -testin tekoa |
| 20.1. |  1   | Backendin runko ja 'shop' sekä 'product' modelit |
| 26.1  |  0.5 | Backend, productsRouterin teko |
| 26.1. |  0.5 | Backend, routerit lisätty ja muutama middleware |
| 27.1. |  1.5 | Rekisteröinti- ja login-lomakkeiden teko, redux-thunk ja reducereiden lisääminen |
| 13.2. |  1   | Muokattu kaikki reducerit hyödyntämään redux-thunk ja reducer -testien lisäys |
| 13.2. |  2   | Kaupan rekisteröinti ja tietojen tallentaminen tietokantaan, unique-validator lisätty jotta kaupan nimi unique |
| 13.2. |  2   | Jsonwebtoken lisätty jotta vain kirjautunut kauppa voi lisätä/muokata tuotteitaan, kaupan login ominaisuus lisätty ja siihen liittyvä reducer |
| 13.2. |  1   | Kaupan sisäänkirjautumissivun pohja |
| 14.2. |  6   | Kuvan lataaminen tietokantaan, tämän tiedon hankintaa sekä kuvan liittäminen tuotteeseen, tuotteen lisäys kaupan admin sivulla |
| 14.2. |  2   | Kuva näkyy nyt Frontin puolella, kirjautunut kauppa näkee vain omat tuotteensa kun kirjautunut sisälle |
| 15.2. |  2   | Tuotteen poisto lisätty, poistaminen poistaa myös siihen liitetyn kuvan sekä kauppa-objektin product-arraylista päivittyy tietokantaan |
| 15.2. |  0.5 | Kaupan poisto-ominaisuus tietokannasta |
| 15.2. |  1.5 | Kaupan editointi mahdollisuus lisätty |
| 15.2. |  3   | Tuotteen editointi mahdollisuus lisätty, kun kuvan vaihtaa, poistuu vanha kuva tietokannasta ja uusi liitetään tilalle |
| 16.2. |  2   | Lisätty react-select dependency, jotta tuotteita voi selailla kauppojen mukaan, filtteröinti ei toimi vielä |
| 16.2. |  2   | Usean kaupan yhtaikainen filtteröinti toimii |
| 16.2. |  3   | Ostoskoritoimintojen luontia, koko korin voi tyhjentää tai yksittäisiä tuotteita poistaa, backendiin lisätty buyer-model ja controllerit |
| 17.2. |  10  | PayPal lisätty maksutoiminnaksi, ennen maksua tarkastus että tuotteiden availability=true, maksun jälkeen tuotteen availability=false |
| 19.2. |  4   | Lisätty komponentit Success ja Cancel riippuen Paypal -maksun onnistumisesta, uusi paymentReducer hallitsemaan ostettuja tuotteita |
| 20.2. |  3   | Kaupan admin -sivulla näkyy nyt kyseisen kaupan ostetut tuotteet ja kunkin tuotteen ostajan tiedot |
| 20.2. |  4   | CSS, sovelluksen ulkonäön suunnittelua ja aloitusta |
| 21.2. |  3.5 | Footer -komponentti, ulkonäön tekoa/CSS |
| 21.2. |  3   | CSS, ulkonäön tekoa/suunnittelua |
| 22.2. |  6   | CSS, ulkonäön tekoa/suunnittelua, kaupan admin -sivujen tuotevalikoiman hakutoiminnon tekoa/yritystä |
| 23.2. |  3   | CSS, ulkonäön tekoa/suunnittelua |
| 24.2. |  2   | CSS, ulkonäön tekoa |
| 24.2. |  5   | Backendin testailun alkua, token liittäminen post-pyyntöjen testailuun |
| 25.2. |  3   | Backendin api-testailua, backendin korjailua |
| 25.2. |  2   | Backendin api-testailua, backendin korjausta |
| 25.2. |  2   | Backendin testien refaktorointia |
| 26.2. |  1.5 | Kaupan login-sivun myynnissä olevien tuotteiden hakutoiminto |
| 26.2. |  1.5 | Alennus-% lisäystä tuotteisiin, jotta alennus lasketaan automaattisesti |
| 26.2. |  3   | Alennus-% korjailua, jotta pyöristää oikein, CSS, alennusprosenttien lisääminen tuotteen tietoihin |
| 26.2. |  0.5 | Testien fixaus |
| 27.2. |  10  | Kartan lisääminen (MapBox), jos kaupalle lisätty koordinaatit, näkyvät ne kartalla. CSS:ää karttanäkymälle |
| 28.2. |  5   | Karttanäkymän ehostamista, kauppaa klikatessa näkyy kartan viereisessä sivuikkunassa kaupan tuotteet |
| 29.2. |  2   | CSS, ulkonäön pientä korjailua ja karttanäkymän parantelua |
| 1.3.  |  2.5 | Rekisteröintilomakkeen ja komponentin uudistuksen aloitus |
| 1.3.  |  3   | Rekisteröintilomakkeen ulkonäön parantamista |
| 1.3.  |  0.5 | Toggle salasanan näkyvyyden asettamiseksi |
| 2.3.  |  1.5 | Rekisteröintilomakkeessa mahdollisuus etsiä kaupan koordinaatit osoitteen perusteella |
| 2.3.  |  3.5 | Kaupan koordinaatit näkyvät vain, jos osoite on olemassa, muuten tulee virheilmoitus, rekisteröintilomakkeen bugi-korjauksia |
| 2.3.  |  1   | Kaupan koordinaatit voi nyt vaihtaa myös kaupan admin-sivujen kautta, rekisteröitymisen jälkeen |
| 3.3.  |  2   | Lisätty ominaisuus, jolla kauppa voi lisätä monta tuotetta kerralla, karttanäkymässä olevat tuotteet eivät päivittyneet oikein oston jälkeen, korjattu |
| 3.3.  |  2   | Kaupan liittymisinfo-komponentin tekoa |
| 3.3.  |  2   | Kaupan liittymisinfon ja kuluttajan osto-info komponenttien teko, molemmissa lyhyt opastus sovelluksen periaatteista |
| 4.3.  |  2.5 | Tuotteen tietoihin lisätty arvo 'viimeinen käyttöpäivä', alennuslaskuri ei toiminut oikein kun tuotetta muokkaa, tämä korjattu |
| 4.3.  |  4   | Viimeinen käyttöpäivä lisätty tuotteisiin ja sovelluksen näkymään, aloitettu funktio, joka poistaa automaattisesti vanhat tuotteet, pieniä korjauksia |
| 5.3.  |  2   | Tuotteella expired-arvo joka päivittyy kun tuote vanhenee, päivittyy automaattisesti, kaupan login-sivulla näkymä, jossa näkee vanhentuneet tuotteet |
| 5.3.  |  1.5 | Tuotetta lisäessä ja muokatessa tarkastetaan että viim. käyttöpäivä on vähintään nykyinen pvm, muuten virheilmoitus, CSS, ulkonäön hiomista |
| 5.3.  |  1.5 | Backend testejä lisätty/korjailtu, muutamia herjausviestejä (DeprecationWarning yms) korjattu pois, frontin puolella pientä CSS -korjailua |
| 5.3.  |  1.5 | CSS: sovelluksessa näkyvät ilmoitukset muutettu aina näkyvään paikkaan (position: fixed), etusivulla näkyvät ensin tuoreimmat tuotteet |
| 6.3.  |  2   | CSS: pientä hiomista sieltä täältä, kaupan admin-sivun tuotesivulla kehotetaan lisäämään tuotteita jos ei niitä myynnissä, kommentteja lisätty koodiin |
| 6.3.  |  1.5 | Footer lisätty osalle komponenteista, CSS -korjauksia |
| 6.3.  |  2   | CSS: ulkonäön hiontaa, lisätty salasana-varmenne kaupan poistoon |
| 7.3.  |  3.5 | Navbar tehty kokonaan uudelleen, jotta se toimii myös mobiilissa, Footer korjattu myös näkymään oikein pienemmällä näytöllä |
| 7.3.  |  2.5 | Etusivun kuva ja koko etusivu tehty responsiiviseksi, kaikki elementit näkyvät hyvin eri resoluutioilla |
| 8.3.  |  6.5 | Sovelluksen ulkonäön tekeminen mobiiliystävällisemmäksi |
| 9.3.  |  1.5 | Sovelluksen mobiiliulkonäön viimeistelyä |
| 9.3.  |  6   | Testauksen alkua, selvitetty yksikkötestausta React Testing Libraryn ja React-Reduxin kanssa, muutama CSS-bugi korjattu |
| 10.3. |  4   | React Testing Library -testien tekoa, ensimmäinen build, sovellus herokuun |
| 10.3. |  2   | Cypress -testejä lisätty |
| 11.3. |  4   | Cypress -testejä lisätty, viimeisiä silauksia ja bugien korjauksia palautusta varten |
| YHT:  |176.5 | |