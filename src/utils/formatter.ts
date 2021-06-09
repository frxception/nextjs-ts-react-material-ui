
export const currencyFormat1 = (n: any, currency: string): string => {
    // @ts-ignore
    const formmated: any = (n.toString().length <= 3) ? Math.floor(n): new Intl.NumberFormat().format(Math.floor(n));
    return currency + formmated; // new Intl.NumberFormat().format(formmated);
}

export const currencyFormat2 = (n: any, currency: string): string => {
    return currency + n.toFixed(2).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
  


