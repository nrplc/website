// CloudFront Function (viewer-request) for newriverlibrary.org + www.newriverlibrary.org
// Redirects all traffic from the old domain to nrplc.org with a permanent (301) redirect.
//
// County page mappings (old WordPress slugs):
//   /etpl/     -> /baker    (Emily Taber Public Library, Baker County)
//   /bradford/ -> /bradford (Bradford County Public Library)
//   /ucpl/     -> /union    (Mary C. Brown / Union County Public Library)
// /baker and /union are also accepted in case anyone guesses them.
// Every other path lands on the nrplc.org homepage so no old link ever 404s.
//
// Based on Laura's "website_redirects" function; adds the etpl/ucpl slugs
// her version was missing (the old site never had /baker or /union paths).

function handler(event) {
    var uri = event.request.uri.toLowerCase();

    var target = "https://nrplc.org";

    if (uri.startsWith("/bradford")) {
        target += "/bradford";
    } else if (uri.startsWith("/etpl") || uri.startsWith("/baker")) {
        target += "/baker";
    } else if (uri.startsWith("/ucpl") || uri.startsWith("/union")) {
        target += "/union";
    }

    return {
        statusCode: 301,
        statusDescription: "Moved Permanently",
        headers: {
            location: { value: target }
        }
    };
}
