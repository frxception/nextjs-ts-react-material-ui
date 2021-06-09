import { render } from '@testing-library/react';
import Layout from '@src/components/Layout';

test('renders a message', () => {
  const { container, getByText } = render(<Layout />);
  expect(getByText('Super Crazy Cheap Budget')).toBeInTheDocument();
  // expect(container.any).toMatchInlineSnapshot(`
  // <body>
  //     <div>
  //       <nav
  //         class="nav"
  //       >
  //         <ul>
  //           <li>
  //             <a
  //               href="/"
  //             >
  //               Home
  //             </a>
  //           </li>
  //           <li>
  //             <a
  //               href="/about"
  //             >
  //               About
  //             </a>
  //           </li>
  //         </ul>
  //       </nav>
  //       <div
  //         class="container"
  //       >
  //         <main
  //           class="main"
  //         >
  //           <div
  //             style="padding: 30px;"
  //           >
  //             <h1
  //               class="title"
  //             >
  //               <span>
  //                 Super Crazy Cheap Budget
  //               </span>
  //                 Hotel Listings
  //             </h1>
  //             <p
  //               class="description"
  //             />
  //           </div>
  //         </main>
  //       </div>
  //     </div>
  //   </body>
  // `);
});
