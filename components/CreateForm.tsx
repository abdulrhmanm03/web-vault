"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Button } from "@/components/shadcn/button";
import { Textarea } from "@/components/shadcn/textarea";
import { Badge } from "@/components/shadcn/badge";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import collectionSchema from "@/schemas/collection";
import { z } from "zod";

export default function CreateForm() {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [links, setLinks] = useState([""]);

  function openForm() {
    setIsActive(true);
    window.history.pushState({ formOpen: true }, "");
    window.addEventListener("popstate", closeForm);
  }

  function closeForm() {
    setIsActive(false);
    setTitle("");
    setDescription("");
    setTag("");
    setTags([]);
    setLinks([""]);
    if (window.history.state?.formOpen) {
      window.history.back();
    }
  }

  function handleSubmit() {
    setTitle(title.trim());
    setDescription(description.trim());

    const formData = {
      title,
      description: description.trim(),
      tags,
      links,
    };

    try {
      collectionSchema.parse(formData);

      axios
        .post("/api/collection", formData)
        .then((response) => {
          console.log("Form submitted successfully:", response.data);
          closeForm();
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert(
            "An error occurred while submitting the form. Please try again.",
          );
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(
          error.errors
            .map((err) => `${err.path.join(" ")}: ${err.message}`)
            .join("\n"),
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  function addTag() {
    const newtag = tag.toLowerCase().trim();
    if (newtag) {
      setTags([...tags, newtag]);
    }
    setTag("");
  }

  function removeTag(index: number) {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  }

  function handleLinkChange(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const values = [...links];
    values[index] = event.target.value;
    setLinks(values);
  }

  function addLink() {
    const values = [...links];
    values.push("");
    setLinks(values);
  }

  function removeLink(index: number) {
    const values = [...links];

    if (values.length > 1) {
      values.splice(index, 1);
      setLinks(values);
    }
  }

  return (
    <>
      <p className="pr-6 cursor-pointer" onClick={openForm}>
        Create
      </p>
      {isActive && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeForm}
        >
          <Card
            className="flex flex-col w-lg w-[90%] max-w-[1000px] h-[900px]"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="items-center">
              <CardTitle>Create collection</CardTitle>
            </CardHeader>
            <ScrollArea className="flex-grow">
              <CardContent>
                <Label htmlFor="title" className="m-2 font-bold">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="title of your collection"
                  className="mb-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <div className="flex justify-between">
                  <Input
                    id="collection-tags"
                    placeholder="add tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="mb-2 mr-4"
                  />
                  <Button onClick={() => addTag()}>Add</Button>
                </div>

                <div className="flex rounded-md mb-6 flex-wrap">
                  {tags.map((tag, i) => (
                    <Badge
                      key={tag}
                      className="m-1 cursor-pointer"
                      onClick={() => removeTag(i)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Label htmlFor="discription" className="mx-2 font-bold">
                  Discription
                </Label>
                <Textarea
                  id="discription"
                  placeholder="add discription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <h4 className="font-bold mt-4 mx-2">Links</h4>
                <hr className="mb-4" />
                {links.map((link, i) => (
                  <div key={i} className="flex justify-between">
                    <Input
                      id="link"
                      placeholder="add link"
                      value={link}
                      onChange={(e) => handleLinkChange(i, e)}
                      className="mb-2 mr-4"
                    />
                    <Button onClick={() => removeLink(i)}>remove</Button>
                  </div>
                ))}
              </CardContent>
            </ScrollArea>

            <CardFooter className="flex justify-center gap-4">
              <Button onClick={addLink}>Add link</Button>
              <Button onClick={handleSubmit}>Create</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
