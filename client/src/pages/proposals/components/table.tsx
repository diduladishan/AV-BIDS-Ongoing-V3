import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import FolderIcon from "../../../assets/proposals-tab/folder icon.png";
import Pagination from "../../../components/pagination";
import { Proposal } from "../../../types";
import api from "../../../utils/api";
const TABLE_HEAD = ["Name", "Company", "Submitted on", "Preview", "Download"];

function ProposalsTable() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [proposalsLoading, setProposalsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const eventsPerPage = 10;

  const fetchProposals = async () => {
    setProposalsLoading(true);
    try {
      const { data } = await api.get("/proposals/user");
      return setProposals(data);
    } catch (error) {
      console.log(error);
    } finally {
      setProposalsLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const TABLE_ROWS = proposals.flatMap((event) =>
    // @ts-ignore
    event.proposals.map((proposal) => ({
      name: proposal.documents[0].fileName,
      company: proposal.provider.company,
      submitted: format(new Date(proposal.createdAt), "dd MMMM yyyy HH:mm"),
      proposalId: proposal._id,
      url: proposal.documents[0].url,
    }))
  );

  const viewProposal = (proposalUrl: string) => {
    window.open(proposalUrl, "_blank");
  };

  const downloadProposal = async (proposalId: string, fileName: string) => {
    try {
      const { data } = await api.get(`/proposals/${proposalId}/download`, {
        responseType: "arraybuffer",
      });

      // Create a Blob from the response data
      const blob = new Blob([data]);

      // Create a download link and trigger a click event to start the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error("Error downloading proposal:", error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedRows = TABLE_ROWS.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <Card className="h-full w-full !shadow-none">
      {proposalsLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      ) : (
        <CardBody className="px-0 py-2">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              {!proposalsLoading && TABLE_ROWS.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    No proposals found.
                  </td>
                </tr>
              )}
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map(
                ({ name, company, submitted, proposalId, url }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={proposalId}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <img
                            src={FolderIcon}
                            alt=""
                            className="!rounded-none"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal truncate"
                            >
                              {name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {company}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <div className="flex items-center gap-2">
                            {" "}
                            <div>{submitted}</div>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Button
                            className="normal-case bg-[#4676FB]"
                            onClick={() =>
                              viewProposal(
                                `https://av-bids-bucket.s3.ap-south-1.amazonaws.com/${url}`
                              )
                            }
                          >
                            View
                          </Button>
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Button
                          className="normal-case bg-[#4676FB]"
                          onClick={() => downloadProposal(proposalId, name)}
                        >
                          Download
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      )}
      <CardFooter className="flex justify-end border-t border-blue-gray-50 p-4">
        <Pagination
          currentPage={currentPage}
          totalItems={proposals.reduce(
            // @ts-ignore
            (total, event) => total + event.proposals.length,
            0
          )}
          itemsPerPage={eventsPerPage}
          onPageChange={handlePageChange}
        />
      </CardFooter>
    </Card>
  );
}

export default ProposalsTable;
