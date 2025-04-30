import { NextRequest, NextResponse } from "next/server";
// import { EnumTokens } from "@/shared"; // Не используем общий экспорт
import { EnumTokens } from "@/shared/services/Auth/auth-token.service";

export function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request;

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAuthPage = url.includes("/auth");

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL("/", url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  // Проверяем, что страница не является публичной (например, главной или магазином)
  const publicPaths = ["/", "/shop", "/about"]; // Добавь другие публичные пути если нужно
  const isPublicPage = publicPaths.some(path => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(path + '/'));

  if (!refreshToken && !isPublicPage) {
    // Если токена нет и страница не публичная, редиректим на авторизацию
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

// Применяем middleware ко всем путям, КРОМЕ статики (_next), API (/api), и файлов (с точкой)
export const config = { 
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets/.*|icons/.*|robots.txt|sitemap.xml).*)',
  ],
};
