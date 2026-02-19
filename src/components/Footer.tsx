export function Footer() {
    return (
        <footer
            className="w-full border-t border-gray-200 dark:border-gray-800 bg-primary-blue-bg/80 backdrop-blur-md
                        px-4 py-1.5 md:px-6 md:py-2 fixed bottom-0 left-0 z-50"
        >
            <p className="mx-auto max-w-5xl text-center text-gray-500 dark:text-gray-400
                          text-[0.6rem] leading-tight md:text-xs md:leading-normal">
                <span>© 2026 allchat LLC. All rights reserved.</span>
                <br className="md:hidden" />
                <span> 18+ only. allchat<span className="align-super text-[0.45rem] md:text-[0.55rem]">®</span> is a registered trademark of allchat LLC.</span>
            </p>
        </footer>
    );
}
