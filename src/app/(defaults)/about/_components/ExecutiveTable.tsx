"use client";

import React from "react";
import Container from "@/components/Container";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const executivelist = [
  {
    id: 1,
    name: "นพ.วรพันธ์ อุกฤษ",
    position: "-",
  },
  {
    id: 2,
    name: "นพ.นิติ รัตนวราหะ",
    position: "-",
  },
  {
    id: 3,
    name: "นพ.นภดล สูตรสุคนธ์",
    position: "พ.ศ.2507 - พ.ศ.2513",
  },
  {
    id: 4,
    name: "นพ.ประดิษฐ์ สุโกมล",
    position: "พ.ศ.2514 - พ.ศ.2517",
  },
  {
    id: 5,
    name: "นพ.องอาจ วชิรพันธ์สกุล",
    position: "1 สิงหาคม พ.ศ.2519 - 14 ตุลาคม พ.ศ.2522",
  },
  {
    id: 6,
    name: "นพ.ธงชัย ทวิชาชาติ",
    position: "1 ธันวาคม พ.ศ.2522 - 26 ตุลาคม พ.ศ.2526",
  },
  {
    id: 7,
    name: "นพ.วีรชัย ภานุมาตรัศมี",
    position: "27 ตุลาคม พ.ศ.2526 - 1 ตุลาคม พ.ศ.2554",
  },
  {
    id: 8,
    name: "นพ.ปัญญา สัตยาภักดีชัย",
    position: "4 ตุลาคม พ.ศ.2554 - 2 ตุลาคม พ.ศ. 2555",
  },
  {
    id: 9,
    name: "นพ.ยุทธพงษ์ ศรีมงคล",
    position: "3 ตุลาคม พ.ศ.2555 - 25 กรกฎาคม พ.ศ. 2556",
  },
  {
    id: 10,
    name: "นพ.ราเชษฎ เชิงพนม",
    position: "26 กรกฎาคม พ.ศ.2556 - ปัจจุบัน",
  },
];

export function ExecutiveTable() {
  return (
    <Container>
      <Card className="flex flex-col min-h-full max-w-7xl justify-center py-2 mt-7 mx-0 sm:mx-auto lg:mx-auto">
        <CardHeader>
          <CardTitle className="text-primary">ทำเนียบผู้บริหาร</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="mx-auto w-full space-x-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-primary text-left w-[10px] sm:w-[100px] lg:w-[150px]">
                  ลำดับ
                </TableHead>
                <TableHead className="text-primary text-center w-[200px] sm:w-[200px] lg:w-[300px]">
                  ชื่อ-สกุล
                </TableHead>
                <TableHead className="text-primary text-right w-[200px] sm:w-[300px] lg:w-[350px]">
                  ดำรงค์ตำแหน่ง
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {executivelist.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left">{item.id}</TableCell>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell className="text-right">{item.position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
}
