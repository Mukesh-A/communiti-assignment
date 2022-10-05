const NodeRsa = require("node-rsa");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
// const key = new NodeRsa({b:1024})
app.use(bodyParser.urlencoded({ extended: true }));

const publicpath = path.join(__dirname, "public");
app.use(express.static(publicpath));

app.set("view engine", "ejs");

//Home Screen
app.post("/", (req, res) => {
  console.log(`Message:${req.body.msg}`);
  let msg = req.body.msg;
  let usertype = req.body.user;

  console.log(usertype);

  public_key =
    "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCVcGX/jptZBYtd5/502Pd6J9sc\n" +
    "gddXOzcREKWUZXxBtzYGQkLX8NOfu1L6Ys69BVcOjyiKPoLFpEkSSZdkBbSWUNz3\n" +
    "45Z6pA1vHkfBku6l4Ddg8ofdxg65TU+UWACZ2tK7sc++W/iUgQx0hKiT2UC/ktga\n" +
    "pfYalkGbAVeaN+sTowIDAQAB\n" +
    "-----END PUBLIC KEY-----";

  private_key =
    "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIICXAIBAAKBgQCVcGX/jptZBYtd5/502Pd6J9scgddXOzcREKWUZXxBtzYGQkLX\n" +
    "8NOfu1L6Ys69BVcOjyiKPoLFpEkSSZdkBbSWUNz345Z6pA1vHkfBku6l4Ddg8ofd\n" +
    "xg65TU+UWACZ2tK7sc++W/iUgQx0hKiT2UC/ktgapfYalkGbAVeaN+sTowIDAQAB\n" +
    "AoGBAIrPmS9FfC+44rgb41UOpPKnSvSz9x9kNcZ4PBYYHs+8K0atDgIgBbN+AZnr\n" +
    "ZjZWW4N+nx2q6zZDYEzIZwPV+OOrvKX8tN40g2T3gFebm2BCnE4s3abF1/UewSfq\n" +
    "AatuVIt1Ri1VYOAH9HneqZ0lDCoGRhouR9UX+BTMgo5clW0hAkEAz6Mhlnk6OfDB\n" +
    "8oXGhwHVum7m4xKmC36FRnIsyF8U8IKa+W2T9Te3r7Nk8h44pgd2BPneuEmIcY/R\n" +
    "9RrK5QQmxQJBALg/D6wXRJSPyy8zV3Y4wsQ37hIIQJQqhi+2tG/ZaNuT7RJnKtcx\n" +
    "aA8les939G3OXBBdkVggUcDKBXMm0AiwN0cCQFoAFNP7cgChWf/8emQUqIaqAYxV\n" +
    "jgGXcr9pR/4GMLZbdj89fw+geg8/jDbiYJ2eyEo54I8y2GCY/WHnniCMnx0CQCnx\n" +
    "8Vd0VKCdu9wbDCZV9cFGGmTwjAMvSy1BowJztHOI0cgGxLIJBW+tULA61uLIwBzZ\n" +
    "sGUntnT1iRgWFfZkZ7ECQD12ZzUqIoXN54mvYZq1MnWtfamxLWxx/OU+qA1hb4BZ\n" +
    "N4QdioqbEhFYUww4hmxSxyIC8WLjNkvJyxmyMtt/tZc=\n" +
    "-----END RSA PRIVATE KEY-----";

  let priv =
    "-----BEGIN PRIVATE KEY-----\n" +
    "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDUOPfvN8VHgAtu\n" +
    "fECTmHzdkmXOw5WP3RrDNxOfL/SG0JJQ25adrUGd1pBM8twhQvpai/tDLcoE23N6\n" +
    "PJZzzTlCq/hPJf2VYuU6zItm1rUzgmUX/iXDSV+niKsIxyfmDvnNT7fwSPxVfnkr\n" +
    "h9RaXhcGqSmTBC+DGD1dMFCFtuqO5kgB9QmM/Hq3Jn36DuKe9fKhnPxoKcjpqOA1\n" +
    "RSxZF31nUIq2OUkRI9JFh/tW8zh2ohQlpwRF34RMGQ72PrfEQo1TVH9cEDagJrKT\n" +
    "FIpbz9DRcJfSEa94KGxhfIJco677ZqARvBCkRUmLKJAk3lxayLuLqDF7sLWEC0Z9\n" +
    "/jYxscTFAgMBAAECggEBAJi/ECTLnWCjFpdFMy2IeYb40fIJ7+IGIDcVszfGSlem\n" +
    "U0mDY1rF0w6J2n6n5izCinMVgZmOoXLxiKIYbamXsnj8UdKV43jcH2U8x7ETJISY\n" +
    "e67TK9btPr3UrlW5EkyRxtYxZJC713KpfwkH0J3iTuxqYRQB1Tij/7bNCYfUaerD\n" +
    "IE9RuITgUpLeqfuuEthRHswofNuY7leNnnHBMAm0/IHNnI+9X6AAixNfgtPOsn2O\n" +
    "IbgkrR2hiYNrqleVeoaMDwHj1lAVEOjjoLfh66xwLQmeeUKAi22h4hBt1+ZhMKB1\n" +
    "sJFaG6A85lhH5vD3w1YE++WCY4cCMkKnyxWBnE+348ECgYEA9naCTmdI6lzydZ66\n" +
    "5i39v+Wbhl4lHllKjRXn9CkwqIeyfeYr8RNytubkj4TZg7k2c4UZqgsI2HlsRBa+\n" +
    "VK7y0ZKgkBJCaRBuWUPgC0w1zZL65VICPhhLuv59OoUFDLyhM7Y383a6/mbCS9IS\n" +
    "Y2NuxFJ2Pq9LXUzZ6mfmXoj0Mh0CgYEA3G9FJMSM5I3R4gc03SKcs2Ue1pwhPwFn\n" +
    "64KeTab1IuxDFqwG4MJfMa/LD2kQvRt1jWGCBkfT4uHEWQPSN6pqIjURXjAMxkoL\n" +
    "B1Q/thcwizInUC0Z/mHoDFgyll9Qnjhaw0YFUaVelHIzwUNhN+EWYEex6mlJR3k6\n" +
    "/SszeoWEXMkCgYBmb9UzDxywRBeGKYYW+5CW/LDKhUC6P3SL9UnmImSV92iJiWxE\n" +
    "E8g/GvJucFITvJxUIUMMeO+hQb5tAmLzQY+s6VuQ5fXyQyEKOvrY10EZg3iCbbZ+\n" +
    "5ow7WWDlPLpfk9sQajERIQ0RhdZFuzdnVcGJGZkJ7sPNMI72LV8DdbrBRQKBgQCQ\n" +
    "hScI5xAUXGKpVN40yReBih+AxpYJb8uJHXbaJEb9YXbOq3RK8URmGAIClXiS8yjL\n" +
    "y4zqvzbMvgXz8kxlkIXK7Y34eXo2mp7GbFbk9CkwaW5a42byX5A6X6yy58S8Juhi\n" +
    "tEqSb+AlZQZHg/x+HUWFVBvyOpr/kBy7lRJIFrdj+QKBgGXXhbE1nBVbTp+CWmKu\n" +
    "v3/E+3Pdv+lcGAkTKb+GZOeN6f7zDWsiV2wCjvEocdl9HlrKI25AP/7jewWTxI3h\n" +
    "U5tGcLOS/gySW/LEX9z0c2xzd8DZP4NKRko8pt/OoENRER3iQvGtyK67WlpS9vCe\n" +
    "s+4mzNLOXGJDrVEkCMBRlKgk\n" +
    "-----END PRIVATE KEY-----";

  let pub =
    " -----BEGIN PUBLIC KEY-----\n" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Dj37zfFR4ALbnxAk5h8\n" +
    "3ZJlzsOVj90awzcTny/0htCSUNuWna1BndaQTPLcIUL6Wov7Qy3KBNtzejyWc805\n" +
    "Qqv4TyX9lWLlOsyLZta1M4JlF/4lw0lfp4irCMcn5g75zU+38Ej8VX55K4fUWl4X\n" +
    "BqkpkwQvgxg9XTBQhbbqjuZIAfUJjPx6tyZ9+g7invXyoZz8aCnI6ajgNUUsWRd9\n" +
    "Z1CKtjlJESPSRYf7VvM4dqIUJacERd+ETBkO9j63xEKNU1R/XBA2oCaykxSKW8/Q\n" +
    "0XCX0hGveChsYXyCXKOu+2agEbwQpEVJiyiQJN5cWsi7i6gxe7C1hAtGff42MbHE\n" +
    "xQIDAQAB\n" +
    "-----END PUBLIC KEY-----";

  let key_private1 = new NodeRsa(private_key);
  let key_public1 = new NodeRsa(public_key);

  let key_private2 = new NodeRsa(priv);
  let key_public2 = new NodeRsa(pub);

  if (usertype === "USER2") {
    //encryption

    var encryptedString = key_public2.encrypt(msg, "base64");
    console.log(encryptedString);

    // decryption;

    var decryptedString = key_private2.decrypt(encryptedString, "utf8");
    console.log(decryptedString);
  }

  if (usertype === "USER1") {
    //encryption

    var encryptedString = key_public1.encrypt(msg, "base64");
    console.log(encryptedString);

    // decryption;

    var decryptedString = key_private1.decrypt(encryptedString, "utf8");
    console.log(decryptedString);
  }

  const user = {
    user: usertype,
    Encrypted_Message: encryptedString,
    Decrypted_Message: decryptedString,
  };

  res.render(__dirname + "/views/display.ejs", { user });
});

app.listen(4000);
