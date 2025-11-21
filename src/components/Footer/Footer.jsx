export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; <span>{new Date().getFullYear()}</span> Around The U.S.
      </p>
    </footer>
  );
}
