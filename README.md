# expectCookiesLike Failure Reproduction

## Current Behavior

When multiple cookies are set via the `res.setHeader('Set-Cookie', cookieArray)` format, [as described in the node docs](https://nodejs.org/dist/latest-v18.x/docs/api/http.html#responsesetheadername-value), [`lightcookie`]() incorrectly parses the cookies that come in the response, even though a browser will proper interpret them.

## Expected Behavior

Honestly, I'd say this should be something for `lightcookie` to fix in its parsing, but seeing as the project hasn't been touched since 2017, I figured this would be a better place to patch around it.

In the parsing of the cookies and the running of the `expectCookiesLike` validator, when []`response.headers['Set-Cookie']`](https://github.com/pactumjs/pactum/blob/9aaea3a59c2d7349b3aeecdb3bee279ee304fb9f/src/models/expect.js#L125) is read, there can be a check for "is this value an array", and if so, either join the array values with an empty string or send each one to `lightcookie` for parsing and then iterate through them to assert that at least one matches the expected values.

## Reproduction steps

1. Clone [this repo](https://github.com/jmcdo29/pactum-cookie-parsing).
2. Run `pnpm install`
3. Run `pnpm test`
4. Notice the assertion error for the `GET /two-cookies` route

I kept the reproduction as barebones as possible using just pactum and express. 
