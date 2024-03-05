import * as React from "react";
import Image from "next/image";
import { Target, Eye, HeartHandshake } from "lucide-react";
import { ExecutiveTable } from "./_components/ExecutiveTable";
import { genPageMetadata } from "@/app/seo";
import Link from "next/link";

export const metadata = genPageMetadata({ title: "เกี่ยวกับเรา" });

export default function AboutPage() {
  return (
      <main className="relative isolate overflow-hidden px-6 py-10 lg:py-10 lg:overflow-visible lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10 lg:pl-4">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-lg lg:text-xl font-bold text-primary ">
                  About US
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-violet-500 lg:text-4xl">
                  ประวัติเกี่ยวกับโรงพยาบาล
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-700">
                  โรงพยาบาลอรัญประเทศ เมื่อ พ.ศ. 2479 นางแย้ม ลักษณลม้าย
                  ได้บริจาคเงินก่อสร้างสุขศาลาโดยได้ปรึกษากับ นายอำเภออรัญประเทศ
                  ชื่อ หลวงยุทธศาสตร์ ประสิทธิ์
                  เห็นชอบด้วยจึงให้ที่ดินราชพัสดุจำนวนประมาณ 10 ไร่
                  โดยไม่เสียค่าเช่า ทางด้านหน้าติดกับถนนสุวรรณศร
                  และทางทิศตะวันออกติดกับถรรมหาดไทยโดยก่อสร้างเป็นสุขศาลาลักษณะเป็นเรือนไม้ชั้นเดียวใต้ถุนสูงพื้นที่ส่วนใหญ่เป็นที่รกมีต้นไม้ปกคลุม
                  น้ำที่ใช้ได้จากการสร้างบ่อน้ำขุดเป็นบ่อสี่เหลี่ยมแบบใช้กระดานกรุ
                  4 ด้าน
                  ต่อมาได้ปรับปรุงเปลี่ยนแปลงโดยใช้เงินงบประมาณบางส่วนร่วมกับเงินบริจาคจากประชาชน
                  เป็นสถานีอนามัยชั้น 1 และศูนย์การแพทย์อนามัย
                  จนเป็นโรงพยาบาลอรัญประเทศปัจจุบัน
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <Image
              src={"/images/about/abouthos.jpg"}
              width={800}
              height={800}
              alt={"abouthos"}
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-xl">
                <p>
                  โรงพยาบาลอรัญประเทศ ตั้งอยู่เลขที่ 4 ถนนมหาดไทย ตำบลอรัญประเทศ
                  อำเภออรัญประเทศ จังหวัดสระแก้ว อยู่ในเขตเทศบาล มีพื้นที่ 10
                  ไร่ 2 งาน 9 ตารางวา เป็นที่ราชวัสดุ ปัจจุบันเป็นโรงพยาบาลขนาด
                  120 เตียง
                </p>
                <ul role="list" className="mt-8 space-y-6 text-gray-600 ">
                  <li className="flex gap-x-3">
                    <Eye
                      className="mt-1 h-6 w-6 flex-none text-violet-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-lg text-gray-900">
                        วิสัยทัศน์ (Vision)
                      </strong>
                      <br />
                      เป็นโรงพยาบาลชั้นนำ ด้านบริการสาธารณสุขชายแดน <br />{" "}
                      และมีมาตรฐานการบริการดูแลผู้ป่วยที่มีคุณภาพ
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <Target
                      className="mt-1 h-6 w-6 flex-none text-violet-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-lg  text-gray-900">
                        พันธกิจ  (Mission)
                      </strong>
                      <br />
                      1. ให้บริการด้านรักษาพยาบาล ด้านส่งเสริมสุขภาพ
                      ด้านป้องกันและควบคุมโรค ด้านฟื้นฟูสุขภาพ ของประชาชน
                      อย่างมีมาตรฐานวิชาชีพ
                      <br />
                      2. พัฒนาระบบงานให้มีมาตรฐาน
                      และระบบบริหารจัดการที่มีประสิทธิภาพ
                      <br />
                      3. สร้างภาคีเครือข่ายมีส่วนร่วมด้านสาธารณสุข
                      และบริการสุขภาพ
                      <br />
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <HeartHandshake
                      className="mt-1 h-6 w-6 flex-none text-violet-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-lg text-gray-900">
                        ค่านิยม  (Value)
                      </strong>
                      <br />
                      บริการดี มีคุณภาพ
                    </span>
                  </li>
                </ul>
                <p className=" text-xl font-semibold text-violet-600 mt-7 ">
                  อาณาเขต
                </p>
                <ul className="text-gray-800 mt-2">
                  <li>
                    <span className="text-green-500 text-base  font-semibold">
                      ทิศเหนือ
                    </span>{" "}
                    ติดกับอำเภอโคกสูง
                  </li>
                  <li>
                    <span className="text-red-500 text-base  font-semibold">
                      ทิศตะวันออก
                    </span>{" "}
                    ติดกับประเทศกัมพูชา
                  </li>
                  <li>
                    <span className="text-blue-500  text-base font-semibold">
                      ทิศใต้
                    </span>{" "}
                    ติดกับอำเภอคลองหาด
                  </li>
                  <li>
                    <span className="text-yellow-500 text-base  font-semibold">
                      ทิศตะวันตก
                    </span>{" "}
                    ติดกับอำเภอวัฒนานคร
                  </li>
                </ul>

                <p className="text-violet-600 text-xl font-semibold mt-7">
                  สภาพภูมิประเทศ
                </p>
                <p className="mt-2 text-base leading-7 ">
                  สภาพทั่วไป
                  พื้นที่จังหวัดสระแก้วโดยรวมเป็นพื้นที่ราบถึงที่ราบสูงและมีภูเขาสูงสลับซับซ้อน
                  มีระดับความสูงจากน้ำทะเล 74 เมตร กล่าวคือ ด้านเหนือ
                  มีทิวเขาบรรทัดซึ่งเป็นต้นกำเนิดของแม่น้ำบางปะกง
                  มีลักษณะเป็นป่าเขาทึบได้แก่
                  บริเวณอุทยานแห่งชาติปางสีดาเป็นแหล่งต้นน้ำลำธาร ด้านใต้
                  มีลักษณะเป็นที่ราบเชิงเขา มีสภาพเป็นป่าโปร่ง
                  ส่วนใหญ่ถูกบุกรุกแผ้วถางป่าเพื่อทำการเกษตร
                  ทำให้เกิดสภาพป่าเสื่อมโทรม ตอนกลางมีลักษณะเป็นที่ราบ ได้แก่
                  อำเภอวังน้ำเย็น อำเภอวังสมบูรณ์ เป็นเขตติดต่อจังหวัดจันทบุรี
                  ด้านตะวันออก ลักษณะเป็นที่ราบถึงที่ราบสูง
                  และมีสภาพเป็นป่าโปร่ง ทำไร่ ทำนา ด้านตะวันตก
                  นับตั้งแต่อำเภอวัฒนานคร
                  มีลักษณะเป็นสันปันน้ำและพื้นที่ลาดไปทางอำเภอเมืองสระแก้วและอำเภออรัญประเทศ
                  เข้าเขตราชอาณาจักรกัมพูชา
                </p>

                <p className="text-violet-600 text-xl font-semibold mt-7">
                  สภาพภูมิอากาศ
                </p>

                <p className="mt-2 text-base leading-7 ">
                  สภาพภูมิอากาศแบ่งออกได้เป็น 3 ฤดูกาล ฤดูร้อน
                  เริ่มต้นแต่เดือนกุมภาพันธ์-เดือนเมษายน ฤดูฝน
                  ตั้งแต่เดือนพฤษภาคม-เดือนตุลาคม ปริมาณน้ำฝนเฉลี่ย 1,296-1,539
                  มิลลิเมตร ฤดูหนาว ตั้งแต่เดือนพฤศจิกายน-เดือนมกราคม
                  อากาศเย็นและมีหมอกในตอนเช้า อุณหภูมิโดยเฉลี่ย 27.5-28.78 องศา
                </p>

                <p className="text-violet-600 text-xl font-semibold mt-7">
                  สถานบริการสุขภาพ
                </p>

                <p className="text-gray-700 font-semibold">
                  สถานบริการพยาบาลในเครือข่ายประกอบไปด้วย
                </p>

                <ul>
                  <Link href="https://www.aran.go.th/" target="_blank" className="flex">
                    🏥 <li className="text-gray-600 font-semibold hover:text-violet-600 hover:underline">สำนักงานสาธารณสุขอำเภออรัญประเทศ</li>
                  </Link>
                  <li className="text-gray-500 font-semibold">
                    🏥 โรงพยาบาลส่งเสริมสุขภาพตำบล 16 แห่ง
                  </li>
                  <ol className="ml-7">
                    <Link href="https://maps.app.goo.gl/CJLEa4JQykskXKJh6" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">1. โรงพยาบาลส่งเสริมสุขภาพตำบลเมืองไผ่</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/4d97RytfTVsiEyLw7" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">2. โรงพยาบาลส่งเสริมสุขภาพตำบลนิคมสร้างตนเองคลองน้ำใส</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/jWTPvGGPRVr5A3Bs5" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">3. โรงพยาบาลส่งเสริมสุขภาพตำบลหันทราย</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/iNCLY77S5gJ3mgSBA" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">4. โรงพยาบาลส่งเสริมสุขภาพตำบลคลองน้ำใส</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/nnx1wksjvV9hbWVR9" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">5. โรงพยาบาลส่งเสริมสุขภาพตำบลท่าข้าม</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/PhFjZiuawYAThGS4A" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">6. โรงพยาบาลส่งเสริมสุขภาพตำบลป่าไร่</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/2NKNUXUuoP5WxTMs9" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">7. โรงพยาบาลส่งเสริมสุขภาพตำบลทับพริก</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/m5GSNG54eFHT46Cy8" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">8. โรงพยาบาลส่งเสริมสุขภาพตำบลบ้านใหม่หนองไทร</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/dqvmJbUAAnhGkDzS6" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">9. โรงพยาบาลส่งเสริมสุขภาพตำบลผ่านศึก</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/DL9M7eaYQtcQax7y6" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">10. โรงพยาบาลส่งเสริมสุขภาพตำบลหนองปรือ</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/LaangwFdtTt8oJ3L6" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">11. โรงพยาบาลส่งเสริมสุขภาพตำบลหนองสังข์</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/e8i4LJ4gEgPS4sbZ9" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">12. โรงพยาบาลส่งเสริมสุขภาพตำบลคลองทับจันทร์</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/KYEjDq9tKk4RDhGP6" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">13. โรงพยาบาลส่งเสริมสุขภาพตำบลฟากห้วย</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/KsQH61Fx6BizDKDd7" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">14. โรงพยาบาลส่งเสริมสุขภาพตำบลบ้านโรงเรียน</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/h8rZ4gQno3q42mmM6" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">15. โรงพยาบาลส่งเสริมสุขภาพตำบลภูน้ำเกลี้ยง</li>
                    </Link>
                    <Link href="https://maps.app.goo.gl/uY3tz8yEPBCdTFb86" target="_blank">
                      <li className="hover:text-violet-600 hover:underline">16. โรงพยาบาลส่งเสริมสุขภาพตำบลคลองหว้า</li>
                    </Link>
                  </ol>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <ExecutiveTable />
        
      </main>

  );
}
