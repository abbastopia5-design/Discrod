
/* =================================
   IEPO - International Organization
   Countries Registry
================================= */

// قائمة الدول المعترف بها
// ستأتي البيانات من قاعدة البيانات لاحقاً

let countries = [];

// عناصر الصفحة
const searchInput = document.getElementById("searchInput");
const countriesTable = document.getElementById("countriesTable");
const countryCount = document.getElementById("countryCount");

// عرض الدول
function displayCountries(data) {
  if (!countriesTable) return;

  if (data.length === 0) {
    countriesTable.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty">
            <strong>لا توجد دول مسجلة حالياً</strong>
            سيتم عرض الدول هنا بعد اعتماد طلبات تسجيلها من إدارة المنظمة.
          </div>
        </td>
      </tr>
    `;
    return;
  }

  countriesTable.innerHTML = data.map(country => `
    <tr>
      <td>${escapeHTML(country.registrationNumber)}</td>
      <td>${escapeHTML(country.name)}</td>
      <td>${escapeHTML(country.president)}</td>
      <td>${escapeHTML(country.capital)}</td>
      <td>${escapeHTML(country.recognitionDate)}</td>
      <td><span class="status">معترف بها</span></td>
    </tr>
  `).join("");
  
  if (countryCount) {
    countryCount.textContent = data.length;
  }
}

// حماية النصوص المعروضة من إدخال HTML غير آمن
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// البحث عن دولة أو رئيس دولة
function searchCountries() {
  const query = searchInput.value.trim().toLowerCase();

  const results = countries.filter(country => {
    return (
      country.name.toLowerCase().includes(query) ||
      country.president.toLowerCase().includes(query)
    );
  });

  displayCountries(results);
}

// البحث المباشر أثناء الكتابة
if (searchInput) {
  searchInput.addEventListener("input", searchCountries);
}

// تشغيل الصفحة
displayCountries(countries);

// تحديث عدد الدول
if (countryCount) {
  countryCount.textContent = countries.length;
}
