import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // ✅ مهم جدًا
};

export default function Pagination({ currentPage, totalPages, baseUrl }: Props) {

  const generatePages = () => {
    const pages: (number | string)[] = [];

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    // أول الصفحات
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    // الصفحات حول الحالية
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // آخر الصفحات
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="pagination">

      {/* السابق */}
      {currentPage > 1 ? (
        <Link
          href={`${baseUrl}${currentPage - 1}`}
          className="page-btn"
        >
          ⬅
        </Link>
      ) : (
        <span className="page-btn disabled">⬅</span>
      )}

      {/* الأرقام */}
      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index} className="page-btn disabled">
            ...
          </span>
        ) : (
          <Link
            key={index}
            href={`${baseUrl}${p}`}
            className={`page-btn ${currentPage === p ? "active" : ""}`}
          >
            {p}
          </Link>
        )
      )}

      {/* التالي */}
      {currentPage < totalPages ? (
        <Link
          href={`${baseUrl}${currentPage + 1}`}
          className="page-btn"
        >
          ➡
        </Link>
      ) : (
        <span className="page-btn disabled">➡</span>
      )}

    </div>
  );
}